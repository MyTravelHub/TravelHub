# search.py
from flask import jsonify
from pymongo import MongoClient

# Define search parameters
search_params = {
    "checked": "checkedBagWeight",
    "carry-on": "carryOn",
    "weight": "checkedBagWeight",
}

# Define airline mappings
airlines = {
    "united": "United Airlines",
}

def handle_search(query, db):
    query_words = query.lower().split()

    response_message = "No relevant information found."

    baggage_info_collection = db.AirlineInfo.BaggageInfo

    # Extract airline name from the query
    airline_name = None
    for word in query_words:
        if word in airlines:
            airline_name = airlines[word]
            break

    search_param = None
    for word in query_words:
        if word in search_params:
            search_param = search_params[word]
            break

    if airline_name and search_param:
        result = search_baggage_info(airline_name, search_param, baggage_info_collection)
        if result:
            response_message = result

    print("Received search query:", query)
    print("Response:", response_message)

    return jsonify({'message': response_message})

def search_baggage_info(airline_name, search_param, baggage_info_collection):
    try:
        query = {
            "airlineName": airline_name,
            search_param: {"$exists": True, "$ne": None}
        }
        print("Query:", query)
        result = baggage_info_collection.find_one(query)

        if result and search_param in result:
            return result[search_param]

        return "No baggage information found."
    except Exception as e:
        print(f"Error occurred in search_baggage_info: {str(e)}")
        return "Error occurred while searching for baggage information."