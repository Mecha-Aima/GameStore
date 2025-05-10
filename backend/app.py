from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)

server = os.getenv('SERVER')
database = os.getenv('DATABASE')
username = os.getenv('USERNAME')
password = os.getenv('PASSWORD')
driver = os.getenv('DRIVER')

connection_string = (
    f"mssql+pyodbc://{username}:{password}@{server}/{database}"
    f"?driver={driver}&Encrypt=Yes&TrustServerCertificate=Yes"
)

engine = create_engine(connection_string, fast_executemany=True)

@app.route('/api/test')
def test():
    return {'message': 'CORS is working!'}

@app.route('/api/games', methods=['GET'])
def get_games():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM Game"))
        games = [dict(row) for row in result.mappings().all()]
        return jsonify(games)
    


if __name__ == '__main__':
    app.run(debug=True)
