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
    


@games_bp.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400
    
    with engine.connect() as conn:
        result = conn.execute(
            text("SELECT * FROM [User] WHERE email = :email AND password = :password"),
            {"email": email, "password": password}
        )
        user = result.mappings().first()
        if user is None:
            return jsonify({'error': 'Invalid username or password.'}), 401

        session['user_id'] = user['user_id']
        session['username'] = user['username']
        session['email'] = user['email']
        session['role'] = user['role']
        return jsonify({'message': 'Login successful', 'user': {'user_id': user['user_id'], 'username': user['username'], 'role': user['role']}})


@games_bp.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = 'customer'  # Default role for signup

    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required.'}), 400

    try:
        with engine.connect() as conn:
            existing = conn.execute(
                text("SELECT * FROM [User] WHERE email = :email OR username = :username"),
                {"email": email, "username": username}
            ).mappings().first()
            if existing:
                return jsonify({'error': 'Email or username already exists.'}), 409

            # Get max user_id
            result = conn.execute(text("SELECT MAX(user_id) AS max_id FROM [User]"))
            max_id_row = result.mappings().first()
            max_user_id = max_id_row['max_id'] if max_id_row['max_id'] is not None else 0
            new_user_id = max_user_id + 1

            # Insert new user
            conn.execute(
                text("INSERT INTO [User] (user_id, username, email, password, role) VALUES (:user_id, :username, :email, :password, :role)"),
                {"user_id": new_user_id, "username": username, "email": email, "password": password, "role": role}
            )
            conn.commit()
            return jsonify({'message': 'Signup successful', 'user': {'user_id': new_user_id, 'username': username, 'role': role}}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@games_bp.route('/api/auth/create_customer', methods=['POST'])
def create_customer():
    data = request.get_json()
    user_id = data.get('user_id')
    full_name = data.get('full_name')
    phone = data.get('phone')
    address = data.get('address')
    if not user_id or not full_name or not phone or not address:
        return jsonify({'error': 'user_id, full_name, phone, and address are required.'}), 400

    try:
        with engine.connect() as conn:
            conn.execute(
                text("INSERT INTO Customer (user_id, full_name, phone, address) VALUES (:user_id, :full_name, :phone, :address)"),
                {"user_id": user_id, "full_name": full_name, "phone": phone, "address": address}
            )
            conn.commit()
            return jsonify({'message': 'Customer created successfully.', }), 201
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
    

@games_bp.route('/api/customer', methods=['GET'])
def get_customer():
    user_id = request.args.get('user_id') or (request.json.get('user_id') if request.is_json else None)
    if not user_id:
        return jsonify({'error': 'user_id is required as a query parameter or in JSON body.'}), 400
    try:
        user_id = int(user_id)
    except (ValueError, TypeError):
        return jsonify({'error': 'user_id must be an integer.'}), 400
    try:
        with engine.connect() as conn:
            result = conn.execute(
                text("SELECT * FROM Customer WHERE user_id = :user_id"),
                {"user_id": user_id}
            )
            customer = result.mappings().first()
            if not customer:
                return jsonify({'error': 'Customer not found.'}), 404
            return jsonify(dict(customer)), 200
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


