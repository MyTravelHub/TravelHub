# search.py
from flask import jsonify
from pymongo import MongoClient

# Define the search dictionary
search_dictionary = {
    "baggage_info": ["carry-on", "checked", "bag", "policy"],
    # Add more categories and keywords as needed
}

def handle_search(query, db):
    # Split the search query into words
    query_words = query.lower().split()

    # Initialize a response message
    response_message = "No relevant information found."

    # Access the baggage_info collection using the passed database reference
    baggage_info_collection = db.baggage_info  # Replace 'baggage_info' with your collection name

    # Iterate through the categories in the search dictionary
    for category, keywords in search_dictionary.items():
        # Check if any keyword is present in the query
        if any(keyword in query_words for keyword in keywords):
            # If a match is found, perform a search in the specified cluster
            if category == "baggage_info":
                # Example: Search for airline baggage information
                # Replace this with your actual database query logic
                result = search_baggage_info(query_words, baggage_info_collection)
                if result:
                    response_message = result
                break  # Exit the loop if a match is found

    # Print the search query and response to the console
    print("Received search query:", query)
    print("Response:", response_message)

    return jsonify({'message': response_message})

def search_baggage_info(query_words, baggage_info_collection):
    result = baggage_info_collection.find({"airlineName": {"$in": query_words}})
    
    # Process the query result and generate a response
    # You can customize this part to format and return the relevant information
    response = []
    for doc in result:
        response.append(f"Airline: {doc['airlineName']}, Policy: {doc['policy']}")
    
    return "\n".join(response) if response else "No baggage information found."
