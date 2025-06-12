from .games import games_bp
from .users import users_bp

def init_routes(app):
    app.register_blueprint(games_bp)
    app.register_blueprint(users_bp)