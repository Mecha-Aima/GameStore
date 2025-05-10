from flask import Blueprint, jsonify, request
from sqlalchemy import text
from ..database import engine

# Create a Blueprint for game routes
games_bp = Blueprint('games', __name__)

@games_bp.route('/api/games', methods=['GET'])
def get_games():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM Game"))
        games = [dict(row) for row in result.mappings().all()]
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
    
