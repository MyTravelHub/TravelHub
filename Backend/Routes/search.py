from flask import Blueprint, request, jsonify

search_bp = Blueprint('search', __name__)

@search_bp.route('/search', methods=['POST'])
def search():
    data = request.json
    search_query = data.get('query')

    # In a real scenario, process the search query and return results
    print("Received search query:", search_query)

    return jsonify({'message': 'Query received'})
