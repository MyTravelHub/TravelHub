# # search.py
# from flask import jsonify
# from pymongo import MongoClient

# # Define the search dictionary
# search_dictionary = {
#     "baggage_info": ["carry-on", "checked", "bag", "policy"],
#     # Add more categories and keywords as needed
# }

# def handle_search(query, db):
#     if query is None:
#         return jsonify({'message': 'No search query provided.'})

#     # Split the search query into words
#     query_words = query.lower().split()

#     # Initialize a response message
#     response_message = "No relevant information found."

#     # Access the baggage_info collection using the passed database reference
#     baggage_info_collection = db.baggage_info  # Replace 'baggage_info' with your collection name

#     # Iterate through the categories in the search dictionary
#     for category, keywords in search_dictionary.items():
#         # Check if any keyword is present in the query
#         if any(keyword in query_words for keyword in keywords):
#             # If a match is found, perform a search in the specified cluster
#             if category == "baggage_info":
#                 # Example: Search for airline baggage information
#                 # Replace this with your actual database query logic
#                 result = search_baggage_info(query_words, baggage_info_collection)
#                 if result:
#                     response_message = result
#                 break  # Exit the loop if a match is found

#     # Print the search query and response to the console
#     print("Received search query:", query)
#     print("Response:", response_message)

#     return jsonify({'message': response_message})

# def search_baggage_info(query_words, baggage_info_collection):
#     result = baggage_info_collection.find({"airlineName": {"$in": query_words}})
    
#     # Process the query result and generate a response
#     # You can customize this part to format and return the relevant information
#     response = []
#     for doc in result:
#         response.append(f"Airline: {doc['airlineName']}, Policy: {doc['policy']}")
    
#     return "\n".join(response) if response else "No baggage information found."

# search.py
from flask import jsonify
from pymongo import MongoClient

# Define the search dictionary
search_dictionary = {
    "baggage_info": ["baggage", "bag", "carry-on", "carry", "checked"],
    # Add more categories and keywords as needed
}

def handle_search(query, db):
    if query is None:
        return jsonify({'message': 'No search query provided.'})

    # Split the search query into words
    query_words = query.lower().split()

    # Initialize a response message
    response_message = "No relevant information found."

    # Access the baggage_info collection using the passed database reference
    baggage_info_collection = db.AirlineInfo.BaggageInfo

    # Define a dictionary of airlines (for demonstration purposes)
    airlines = {"united": "United Airlines"}  # Add more airlines as needed

    # Initialize variables to store search parameters
    airline_name = None
    search_param = None

    # Iterate through the categories in the search dictionary
    for category, keywords in search_dictionary.items():
        # Check if any keyword is present in the query
        if any(keyword in query_words for keyword in keywords):
            if category == "baggage_info":
                # Check if an airline name is mentioned in the query
                for word in query_words:
                    if word in airlines:
                        airline_name = airlines[word]
                        print(f"Airline Name: {airline_name}")
                # Check for specific keywords
                for word in query_words:
                    if "checked" in word:
                        search_param = "checked"
                        print("Search Parameter: checked")
                    elif "carry-on" in word:
                        search_param = "carryOn"
                        print("Search Parameter: carryOn")
                # Perform the database query
                if airline_name and search_param:
                    result = search_baggage_info(airline_name, search_param, baggage_info_collection)
                    if result:
                        response_message = result
                        print("Query Result:", response_message)
                break  # Exit the loop if a match is found

    # Print the search query and response to the console
    print("Received search query:", query)
    print("Response:", response_message)

    return jsonify({'message': response_message})

def search_baggage_info(airline_name, search_param, baggage_info_collection):
    # Example: Search for airline baggage information
    # Replace this with your actual database query logic
    result = baggage_info_collection.find({"airlineName": airline_name})

    # Process the query result and generate a response
    response = []
    for doc in result:
        if search_param in doc:
            response.append(f"Airline: {doc['airlineName']}, {search_param}: {doc[search_param]}")

    return "\n".join(response) if response else "No baggage information found."
