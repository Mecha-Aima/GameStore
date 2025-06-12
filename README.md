# 🎮 GameStore

A full-stack e-commerce platform for video game retail, featuring a modern React frontend and robust Flask backend with SQL Server database integration.

## 🌟 Overview

GameStore is a comprehensive e-commerce solution that provides users with an intuitive interface for browsing, purchasing, and managing video game collections. The platform includes both customer-facing features and administrative tools for catalog management.

## ✨ Key Features

### Customer Experience
- **Game Catalog Browsing** - Explore games with filtering by genre, price, and availability
- **Product Details** - Comprehensive game information with cover images and descriptions  
- **Shopping Cart** - Add, modify, and remove items with real-time stock validation
- **Order Processing** - Complete purchase workflow with order confirmation
- **User Authentication** - Secure registration and login system

### Administrative Tools
- **Game Management** - Add new games to catalog with image uploads
- **Inventory Control** - Real-time stock tracking and management
- **Order Monitoring** - View and track customer orders
- **User Management** - Customer account administration

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **Vite** - Fast development server and build tool
- **Tailwind CSS** - Utility-first styling framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API communication
- **Context API** - Application state management

### Backend
- **Flask 3.1.0** - Python web framework
- **SQLAlchemy 2.0.40** - Database ORM and SQL toolkit
- **Flask-CORS** - Cross-origin resource sharing
- **SQL Server** - Microsoft SQL Server database
- **pyodbc** - SQL Server connectivity driver

## 📁 Project Structure

```
GameStore/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   └── context/         # State management
│   └── public/
│       └── game-covers/     # Game cover images
├── backend/                 # Flask backend API
│   ├── routes/              # API endpoint modules
│   ├── app.py              # Main Flask application
│   ├── database.py         # Database configuration
│   └── GamestoreDB.sql     # Database schema file
├── api-contract.md         # API documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Node.js v18+** and npm
- **Python 3.8+** 
- **SQL Server** (local instance or cloud)
- **git**

### 1. Clone Repository
```bash
git clone https://github.com/Mecha-Aima/GameStore.git
cd GameStore
```

### 2. Database Setup
Create a local SQL Server database and run the schema:
```bash
# Use the provided SQL file to create the database structure
# File location: backend/GamestoreDB.sql
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file in the backend directory:
```env
SERVER=localhost,1433
DATABASE=game-store
USERNAME=SA
PASSWORD=<your-password>
DRIVER=/opt/homebrew/lib/libmsodbcsql.17.dylib
```

**Database Configuration Notes:**
- The above configuration works with **Azure Data Studio** on macOS
- For **SSMS (SQL Server Management Studio)** users, driver path and connection parameters may differ
- Consult SSMS-specific documentation for your environment setup
- Ensure your SQL Server instance is running and accessible

### 4. Frontend Setup
```bash
cd frontend
npm install
```

### 5. Run Application
**Backend** (from backend directory):
```bash
python app.py
# Runs on http://localhost:3000
```

**Frontend** (from frontend directory):
```bash
npm run dev
# Runs on http://localhost:5173
```

## 📖 API Documentation

Detailed API contract available in `api-contract.md`, organized by frontend functionality:
- Game catalog endpoints
- User authentication
- Cart management  
- Order processing
- Administrative functions

## 🎓 Project Learning Outcomes

This project was developed as a **group learning exercise** focused on full-stack web development. 

### Key Technical Learnings:
- **Full-Stack Integration** - Connecting React frontend with Flask backend APIs
- **Database Design** - SQL Server schema design and relationship modeling
- **State Management** - React Context API for application-wide state
- **Authentication Flow** - Session-based user authentication and authorization
- **CORS Configuration** - Cross-origin resource sharing for API security
- **RESTful API Design** - Proper HTTP methods and response structures
- **File Upload Handling** - Image upload and storage management
- **Error Handling** - Graceful error management across the stack

### Development Skills Gained:
- Modern React development patterns and hooks
- Flask application architecture and blueprints
- SQL Server integration with Python
- Responsive design with Tailwind CSS
- Version control and collaborative development
- API testing and debugging techniques

---

*This project demonstrates practical application of modern web development technologies in building a complete e-commerce solution.*

