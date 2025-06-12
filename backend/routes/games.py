from flask import Blueprint, jsonify, request, session
from sqlalchemy import text
from database import engine
import os
from urllib.parse import quote
from datetime import date

# Create a Blueprint for game routes
games_bp = Blueprint('games', __name__)

@games_bp.route('/api/games', methods=['GET'])
def get_games():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM Game"))
        games = [dict(row) for row in result.mappings().all()]
        
        for game in games:
            if 'image_url' in game and game['image_url']:
                filename = os.path.basename(game['image_url']) 
                game['image_url'] = '/game-covers/' + quote(filename)
        
        return jsonify(games)

@games_bp.route('/api/games/<int:game_id>', methods=['GET'])
def get_game_by_id(game_id):
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT * FROM Game WHERE game_id = :game_id"),
            {"game_id": game_id}
        )
        game = result.mappings().first()
        
        if game is None:
            return jsonify({"error": "Game not found"}), 404
            
        return jsonify(dict(game))

@games_bp.route('/api/games/stock', methods=['GET'])
def get_game_stock():
    game_id = request.args.get('game_id')
    if not game_id:
        return jsonify({'error': "No game ID provided"}), 400
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT quantity FROM Inventory WHERE game_id = :game_id"),
            {"game_id": game_id}
        )
        stock = result.scalar_one_or_none()
        if stock is None:
            return jsonify({'error': 'Game not found in inventory'}), 404
        return jsonify({'stock': stock}), 200

@games_bp.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        with engine.connect() as conn:
            # Create the OrderSummaryView if it doesn't exist
            conn.execute(text("""
                IF NOT EXISTS (SELECT * FROM sys.views WHERE name = 'OrderSummaryView')
                BEGIN
                    EXEC('CREATE VIEW OrderSummaryView AS
                    SELECT 
                        o.order_id, o.order_date, c.full_name AS customer_name,
                        c.phone AS customer_phone, o.status AS order_status,
                        p.status AS payment_status, p.method AS payment_method,
                        SUM(oi.unit_price * oi.quantity) AS total_amount
                    FROM [Order] o
                    JOIN Customer c ON o.customer_id = c.user_id
                    JOIN OrderItem oi ON o.order_id = oi.order_id
                    LEFT JOIN Payment p ON o.order_id = p.order_id
                    GROUP BY o.order_id, o.order_date, c.full_name, c.phone, o.status, p.status, p.method');
                END
            """))
            
            # Query the view
            result = conn.execute(text("SELECT * FROM OrderSummaryView ORDER BY order_date DESC"))
            orders = [dict(row) for row in result.mappings().all()]
            
            return jsonify(orders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@games_bp.route('/api/orders/add', methods=['POST'])
def add_order():
    data = request.get_json()
    customer_id = data.get('customer_id')
    if not customer_id:
        return jsonify({'error': 'customer_id is required.'}), 400

    order_date = date.today()
    status = 'Pending'

    try:
        with engine.connect() as conn:
            # Get max order_id
            result = conn.execute(text("SELECT MAX(order_id) AS max_id FROM [Order]"))
            max_id_row = result.mappings().first()
            max_order_id = max_id_row['max_id'] if max_id_row['max_id'] is not None else 0
            new_order_id = max_order_id + 1

            # Insert new order
            conn.execute(
                text("INSERT INTO [Order] (order_id, order_date, customer_id, status) VALUES (:order_id, :order_date, :customer_id, :status)"),
                {"order_id": new_order_id, "order_date": order_date, "customer_id": customer_id, "status": status}
            )
            conn.commit()
            print("Order created successfully.")
            return jsonify({'message': 'Order created successfully.', 'order': {'order_id': new_order_id, 'order_date': order_date, 'customer_id': customer_id, 'status': status}}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@games_bp.route('/api/orders/get', methods=['GET'])
def get_order():
    order_id = request.args.get('order_id')
    print("Order ID: ", order_id)
    if not order_id:
        return jsonify({'error': 'order_id is required.'}), 400
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM [Order] WHERE order_id = :order_id"), {"order_id": order_id})
        row = result.mappings().first()
        print("Row: ", row)
        return jsonify(dict(row) if row else {}), 200

@games_bp.route('/api/order_items/add', methods=['POST'])
def add_order_item():
    data = request.get_json()
    order_id = data.get('order_id')
    game_id = data.get('game_id')
    unit_price = data.get('unit_price')
    quantity = data.get('quantity')
    if not all([order_id, game_id, unit_price, quantity]):
        return jsonify({'error': 'order_id, game_id, unit_price, and quantity are required.'}), 400

    try:
        with engine.connect() as conn:
            conn.execute(
                text("INSERT INTO OrderItem (order_id, game_id, unit_price, quantity) VALUES (:order_id, :game_id, :unit_price, :quantity)"),
                {"order_id": order_id, "game_id": game_id, "unit_price": unit_price, "quantity": quantity}
            )
            conn.commit()
            return jsonify({'message': 'Order item created successfully.', 'order_item': {'order_id': order_id, 'game_id': game_id, 'unit_price': unit_price, 'quantity': quantity}}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@games_bp.route('/api/payment/add', methods=['POST'])
def add_payment():
    data = request.get_json()
    order_id = data.get('orderId')
    payment_method = data.get('paymentMethod')
    status = data.get('status')
    payment_date = date.today()
    print("Order ID: ", order_id)
    print("Payment Method: ", payment_method)
    print("Status: ", status)
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT MAX(payment_id) as max_id FROM [Payment]" ))
            max_id_row = result.mappings().first()
            max_order_id = max_id_row['max_id'] if max_id_row['max_id'] else 0
            new_order_id = max_order_id + 1
            print("New Payment ID: ", new_order_id)

            # Insert new payment
            res = conn.execute(text("INSERT INTO Payment (payment_id, order_id, method, status, payment_date) VALUES (:payment_id, :order_id, :payment_method, :status, :payment_date)"),
                               {"payment_id": new_order_id, "order_id": order_id, "payment_method": payment_method, "status": status, "payment_date": payment_date})
            conn.commit()
            return jsonify({'message': 'Payment added successfully.', 'payment': {'payment_id': new_order_id, 'order_id': order_id, 'payment_method': payment_method, 'status': status, 'payment_date': payment_date}}), 201


    except Exception as e:
        return jsonify({'error': str(e)}), 500

@games_bp.route('/api/games/add', methods=['POST'])
def add_game():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    price = data.get('price')
    stock = data.get('stock')
    release_date = data.get('release_date')
    genre = data.get('genre')
    platforms = data.get('platforms')
    image_url = data.get('image_url')
    
    # Validate required fields
    if not all([title, price, stock, release_date, genre, platforms]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        with engine.connect() as conn:
            # Get max game_id
            result = conn.execute(text("SELECT MAX(game_id) AS max_id FROM Game"))
            max_id_row = result.mappings().first()
            max_game_id = max_id_row['max_id'] if max_id_row['max_id'] else 0
            new_game_id = max_game_id + 1

            # Insert new game
            conn.execute(
                text("INSERT INTO Game (game_id, title, description, genre, platform, price, release_date, image_url) VALUES (:game_id, :title, :description, :genre, :platforms, :price, :release_date, :image_url)"),
                {
                    "game_id": new_game_id, 
                    "title": title, 
                    "description": description, 
                    "genre": genre, 
                    "platforms": platforms, 
                    "price": price, 
                    "release_date": release_date, 
                    "image_url": image_url
                }
            )
            
            # Add initial stock to Inventory table
            conn.execute(
                text("INSERT INTO Inventory (game_id, quantity) VALUES (:game_id, :quantity)"),
                {"game_id": new_game_id, "quantity": stock}
            )
            
            conn.commit()
            
            return jsonify({
                'message': 'Game created successfully', 
                'game': {
                    'game_id': new_game_id, 
                    'title': title, 
                    'description': description, 
                    'genre': genre, 
                    'platforms': platforms, 
                    'price': price, 
                    'release_date': release_date, 
                    'image_url': image_url,
                    'stock': stock
                }
            }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@games_bp.route('/api/upload-image', methods=['POST'])
def upload_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image = request.files['image']
        if image.filename == '':
            return jsonify({'error': 'No image file selected'}), 400
        
        # Get the filename and ensure directory exists
        filename = image.filename
        # Navigate from backend/routes directory to frontend/public/game-covers
        upload_dir = os.path.join('..', 'frontend', 'public', 'game-covers')
        
        # Save the file
        file_path = os.path.join(upload_dir, filename)
        print("File path: ", file_path)
        image.save(file_path)
        
        return jsonify({'message': 'Image uploaded successfully', 'filename': filename}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

