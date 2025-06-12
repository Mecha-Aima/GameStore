# GameStore Backend API

A robust Flask-based REST API backend for the GameStore e-commerce platform that provides comprehensive game catalog management, user authentication, order processing, and administrative functionality.

## 🚀 Technology Stack

- **Flask 3.1.0** - Modern Python web framework
- **SQLAlchemy 2.0.40** - SQL toolkit and Object-Relational Mapping
- **Flask-CORS 5.0.1** - Cross-Origin Resource Sharing support
- **Flask-SQLAlchemy 3.1.1** - Flask extension for SQLAlchemy
- **SQL Server** - Microsoft SQL Server database with pyodbc driver
- **Python 3.x** - Programming language

## 📁 Project Structure

```
backend/
├── routes/                   # API route modules
│   ├── __init__.py          # Route initialization
│   ├── games.py             # Game-related endpoints
│   └── users.py             # User and authentication endpoints
├── app.py                   # Main Flask application
├── database.py              # Database connection configuration
└── requirements.txt         # Python dependencies
```

## 🗄️ Database Schema

The backend integrates with a SQL Server database containing the following main tables:

- **User** - User accounts and authentication
- **Customer** - Customer profile information
- **Game** - Game catalog with details and metadata
- **Inventory** - Game stock management
- **Order** - Customer orders and status tracking
- **OrderItem** - Individual items within orders
- **Payment** - Payment processing and records

## 🛣️ API Endpoints

### 🎮 Game Management (`/api/games`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET` | `/api/games` | Retrieve all games with stock info | Public |
| `GET` | `/api/games/<id>` | Get specific game details | Public |
| `GET` | `/api/games/stock` | Check stock for specific game | Public |
| `POST` | `/api/games/add` | Add new game to catalog | Admin |
| `POST` | `/api/upload-image` | Upload game cover images | Admin |

### 👤 User Authentication (`/api/auth`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `POST` | `/api/auth/login` | User authentication | Public |
| `POST` | `/api/auth/signup` | User registration | Public |
| `POST` | `/api/auth/create_customer` | Create customer profile | Authenticated |

### 👥 Customer Management (`/api/customers`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET` | `/api/customers` | Get all customers | Admin |
| `GET` | `/api/customer` | Get specific customer details | Authenticated |

### 🛒 Order Processing (`/api/orders`)

| Method | Endpoint | Description | Access Level |
|--------|----------|-------------|--------------|
| `GET` | `/api/orders` | Retrieve all orders summary | Admin |
| `POST` | `/api/orders/add` | Create new order | Authenticated |
| `GET` | `/api/orders/get` | Get specific order details | Authenticated |
| `POST` | `/api/order_items/add` | Add items to order | Authenticated |
| `POST` | `/api/payment/add` | Process payment for order | Authenticated |

## 🔄 Backend Logic Flow

### 1. Application Initialization
- Flask app creation with CORS enabled
- Database connection establishment via SQLAlchemy
- Blueprint registration for modular routing
- Session configuration for authentication

### 2. Database Integration
- **Connection**: SQL Server via pyodbc driver with connection pooling
- **Environment Variables**: Secure database credentials management
- **Query Execution**: Raw SQL queries using SQLAlchemy text() for complex operations
- **Transaction Management**: Automatic commit/rollback handling

### 3. Authentication & Session Management
- **Session-based Authentication**: Flask sessions with secure cookie configuration
- **Role-based Access Control**: Customer vs Admin role differentiation
- **Password Security**: Direct password validation (Note: Consider encryption for production)

### 4. Game Catalog Management
- **Dynamic Stock Tracking**: Real-time inventory integration
- **Image Handling**: File upload and URL generation for game covers
- **Filtering Support**: Genre-based and search functionality
- **Admin Controls**: Game addition and inventory management

### 5. Order Processing Workflow
- **Cart to Order**: Convert cart items to formal orders
- **Inventory Updates**: Stock reduction upon order confirmation
- **Payment Integration**: Multiple payment method support
- **Order Tracking**: Status updates and history maintenance

### 6. Error Handling & Validation
- **Input Validation**: Required field checking and data type validation
- **Exception Handling**: Graceful error responses with appropriate HTTP status codes
- **Database Error Management**: Connection and query error handling

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.8 or higher
- SQL Server instance (local or remote)
- pip package manager

### Environment Configuration

1. **Create environment file (`.env`)**
   ```env
   SERVER=your_sql_server_host
   DATABASE=your_database_name
   USERNAME=your_db_username
   PASSWORD=your_db_password
   DRIVER=ODBC+Driver+17+for+SQL+Server
   ```

### Installation Steps

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure database connection**
   - Ensure SQL Server is running and accessible
   - Create database tables according to schema
   - Update `.env` file with your database credentials

5. **Start the development server**
   ```bash
   python app.py
   ```
   The API will be available at `http://localhost:3000`

### Database Setup

Ensure your SQL Server database includes the following tables:
- User, Customer, Game, Inventory, Order, OrderItem, Payment
- Create the `OrderSummaryView` and `CustomerDetailsView` for reporting
- Set up appropriate indexes for performance optimization

## 🔧 Configuration

### Flask Configuration
- **Debug Mode**: Enabled for development (`app.run(debug=True)`)
- **Secret Key**: Set for session management (change for production)
- **CORS**: Configured to support credentials and cross-origin requests

### Database Configuration
- **Connection Pooling**: Enabled via SQLAlchemy engine
- **Connection String**: Supports encrypted connections with certificate trust
- **Fast Executemany**: Optimized for bulk operations

### Session Configuration
- **SameSite**: Set to 'Lax' for cross-site compatibility
- **Secure**: Disabled for local development (enable for HTTPS in production)

## 🔒 Security Features

- **CORS Protection**: Configured for specific frontend origin
- **Session Management**: Secure session-based authentication
- **Input Validation**: Server-side validation for all endpoints
- **SQL Injection Prevention**: Parameterized queries using SQLAlchemy
- **Role-based Access**: Admin-only endpoints protection

## 📊 API Response Format

### Success Response
```json
{
  "message": "Operation successful",
  "data": { ... },
  "status": 200
}
```

### Error Response
```json
{
  "error": "Error description",
  "status": 400
}
```

## 🔍 Monitoring & Debugging

- **Console Logging**: Detailed operation logs for debugging
- **Error Tracking**: Exception handling with descriptive error messages
- **Database Query Logging**: SQL query execution monitoring
- **Request/Response Logging**: API call tracking for debugging


## 📝 Notes

- The application uses raw SQL queries for complex operations
- Game cover images are stored in the frontend's `public/game-covers/` directory
- Session-based authentication requires proper CORS configuration
- Database views are created dynamically for reporting features
- All monetary calculations should maintain precision for financial accuracy 