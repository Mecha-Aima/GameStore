from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/api/test')
def test():
    return {'message': 'CORS is working!'}

if __name__ == '__main__':
    app.run(debug=True)
