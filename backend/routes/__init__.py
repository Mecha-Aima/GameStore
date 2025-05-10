from .games import games_bp

def init_routes(app):
    app.register_blueprint(games_bp)