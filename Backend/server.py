# server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import os
from search import handle_search

load_dotenv()

uri = os.getenv('MONGO_URI')
client = MongoClient(uri)

app = Flask(__name__)
CORS(app)

try:
    client.admin.command('ping')
    print("Connected to MongoDB!")
except ConnectionFailure as e:
    print("Failed to connect to MongoDB because:", e)

db = client.AirlineInfo

@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'Pong!'})

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    search_query = data.get('query')

    print('Query received:', search_query)  # Print the query received

    response = handle_search(search_query, db)
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)