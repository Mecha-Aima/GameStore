from flask import Blueprint, jsonify, request, session
from sqlalchemy import text
from database import engine
from datetime import date

# Create a Blueprint for user routes
users_bp = Blueprint('users', __name__)

@users_bp.route('/api/auth/login', methods=['POST'])
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


@users_bp.route('/api/auth/signup', methods=['POST'])
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


@users_bp.route('/api/customers', methods=['GET'])
def get_customers():
    try:
        with engine.connect() as conn:
            
            # Query the view
            result = conn.execute(text("SELECT * FROM CustomerDetailsView ORDER BY full_name"))
            customers = [dict(row) for row in result.mappings().all()]
            
            return jsonify(customers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@users_bp.route('/api/auth/create_customer', methods=['POST'])
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


@users_bp.route('/api/customer', methods=['GET'])
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