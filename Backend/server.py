from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.errors import ConnectionFailure  # Import ConnectionFailure
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Connect to MongoDB using the URI from environment variables
uri = os.getenv('MONGO_URI')
client = MongoClient(uri)

# Create a Flask app
app = Flask(__name__)
CORS(app)

# Check MongoDB connection
try:
    client.admin.command('ping')
    print("Connected to MongoDB!")  # Confirmation message
except ConnectionFailure as e:
    print("Failed to connect to MongoDB:", e)

# Example route: Ping endpoint
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Pong!'})

# Route for search endpoint
@app.route('/search', methods=['POST'])
def search():
    data = request.json
    search_query = data.get('query')

    # In a real scenario, process the search query and return results
    # For now, print the search query and return a mock response
    print("Received search query:", search_query)
    return jsonify({'message': 'Query received'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
