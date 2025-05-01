## Summary

This README provides step-by-step instructions to clone the Game Store project, install and configure the Flask backend and React Vite frontend, view the OpenAPI contract, and test the API routes locally.  ([Getting Started - Vite](https://vite.dev/guide/?utm_source=chatgpt.com), [Quickstart — Flask Documentation (3.1.x)](https://flask.palletsprojects.com/en/stable/quickstart/?utm_source=chatgpt.com))

---  


## Prerequisites

1. **Node.js v18+** – Required for Vite and React development.   
2. **npm (comes with Node.js)** – Package manager to install frontend dependencies. 
3. **Python 3.8+** – Required to run the Flask backend. 
4. **git** – To clone the repository.  
5. **SQL Server** – As your database; ensure it’s running and reachable.  

---  


## 1. Clone the Repository

```bash
git clone https://github.com/Mecha-Aima/GameStore.git
cd game-store
```

---  


## 2. Backend Setup (Flask)

### 2.1 Create and Activate a Virtual Environment

```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```  

### 2.2 Install Python Dependencies

```bash
pip install flask flask-cors flask-sqlalchemy pyodbc
```  
- **flask-cors** simplifies adding CORS support  ([flask-cors - PyPI](https://pypi.org/project/flask-cors/?utm_source=chatgpt.com), [Installation - Flask-CORS - Read the Docs](https://flask-cors.readthedocs.io/en/v1.1/?utm_source=chatgpt.com))  
- **flask-sqlalchemy** integrates SQLAlchemy ORM with Flask  ([Install Flask-Sqlalchemy with Pip - GeeksforGeeks](https://www.geeksforgeeks.org/install-flask-sqlalchemy-with-pip/?utm_source=chatgpt.com))  
- **pyodbc** enables connecting to SQL Server from Python  

### 2.3 Configure Environment Variables

Create a `.env` file in the project root with:

```dotenv
FLASK_APP=app.py
FLASK_ENV=development
DATABASE_URL="mssql+pyodbc://username:password@SERVER/DB?driver=ODBC+Driver+17+for+SQL+Server"
```

Install python-dotenv if needed:

```bash
pip install python-dotenv
```

---  


## 3. Frontend Setup (React + Vite)

### 3.1 Initialize or Update the Vite React App

If not already scaffolded, run:

```bash
npm create vite@latest frontend -- --template react
cd frontend
```  
This command bootstraps a React project with Vite.  ([Build a React app from Scratch](https://react.dev/learn/build-a-react-app-from-scratch?utm_source=chatgpt.com), [Getting Started - Vite](https://v3.vitejs.dev/guide/?utm_source=chatgpt.com))  

### 3.2 Install NPM Dependencies

```bash
npm install
```

---  


## 4. Running the Application

### 4.1 Start the Flask Backend

From the project root (with the virtual env activated):

```bash
flask --app app.py run --debug
```  
This launches the development server on `http://127.0.0.1:5000`.  ([Quickstart — Flask Documentation (3.1.x)](https://flask.palletsprojects.com/en/stable/quickstart/?utm_source=chatgpt.com), [How to run a flask application? - Stack Overflow](https://stackoverflow.com/questions/29882642/how-to-run-a-flask-application?utm_source=chatgpt.com))  

### 4.2 Start the React Frontend

In a separate terminal, navigate to the `frontend` folder:

```bash
npm run dev
```  
This starts Vite’s dev server on `http://localhost:3000`. 

---  


## 5. Viewing the API Contract

The API contract is defined in a human-readable **Markdown file** named `api-contract.md` located at the root of the project.

### 🔍 How It’s Structured:
The contract is organized by **frontend page/functionality** for clarity and developer collaboration:
- **Home Page**: Game listing, filters, genre fetch
- **Product Details Page**: Game detail retrieval
- **Cart Page**: Add/remove/update items
- **Order Summary Page**: Cart preview and order placement
- **Login & Registration Page**: User authentication endpoints

### 📖 How to Use It:
- Open `api-contract.md` in any Markdown viewer or code editor.
- Each endpoint is shown with:
  - **Method** (GET, POST, etc.)
  - **Path** (e.g., `/api/games`)
  - **Brief Description**
  - **Parameters / Expected Body**, if applicable

Use this document to:
- Mock backend routes before connecting to the database
- Coordinate frontend-backend responsibilities
- Verify that Flask routes align with frontend expectations

---  


## 6. Testing the API Routes

You can test endpoints using **curl**, **Postman**, or your browser:

```bash
# List games
curl http://127.0.0.1:5000/api/games

# Get game by ID
curl http://127.0.0.1:5000/api/games/1

# Add to cart
curl -X POST http://127.0.0.1:5000/api/cart \
     -H "Content-Type: application/json" \
     -d '{"gameId":1,"quantity":2}'
```  

- Replace mock JSON in your Flask stubs with real database queries.  
- Implement authentication, authorization, and error handling.  
- Expand API contract with response schemas and security schemes.  

