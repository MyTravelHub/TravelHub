from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Function to get user input for baggage information
def get_baggage_info_input():
    airline_name = input("Enter Airline Name: ")
    carry_on_bag_size = input("Enter Carry-On Bag Size: ")
    checked_bag_size = input("Enter Checked Bag Size: ")
    checked_bag_weight = input("Enter Checked Bag Weight: ")
    policy = input("Enter Baggage Policy: ")

    baggage_info = {
        "airlineName": airline_name,
        "carryOnBagSize": carry_on_bag_size,
        "checkedBagSize": checked_bag_size,
        "checkedBagWeight": checked_bag_weight,
        "policy": policy
    }

    return baggage_info

def main():
    # Get the MongoDB connection URI from the environment variables
    mongo_uri = os.getenv('MONGO_URI')

    # Connect to MongoDB using the URI from the environment variables
    client = MongoClient(mongo_uri)
    db = client.AirlineInfo
    baggage_info_collection = db.BaggageInfo

    while True:
        # Get user input for baggage information
        baggage_info = get_baggage_info_input()

        # Insert the document into the collection
        result = baggage_info_collection.insert_one(baggage_info)

        if result.acknowledged:
            print("Document inserted successfully with ID:", result.inserted_id)
        else:
            print("Failed to insert document.")

        another_entry = input("Do you have another entry? (yes/no): ")
        if another_entry.lower() != "yes":
            break

if __name__ == "__main__":
    main()
