from flask import Flask
from flask_cors import CORS
from routes import init_routes

def create_app():
    app = Flask(__name__)
    app.secret_key = 'dev-secret-key' 
    CORS(app, supports_credentials=True)
    
    # Initialize routes
    init_routes(app)

    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  
    app.config['SESSION_COOKIE_SECURE'] = False 
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)