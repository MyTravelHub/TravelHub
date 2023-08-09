import pymongo
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the MongoDB URI from the environment variable
mongo_uri = os.getenv("MONGO_URI")

# Connect to MongoDB
client = pymongo.MongoClient(mongo_uri)
db = client["AirlineInfo"]
baggage_info_collection = db["BaggageInfo"]

# Test data
test_data = [
        {
  "airline_name": "United",
  "keywords": ["United", "airline", "carry on", "baggage", "policy"],
  "carry_on_size": "22 x 14 x 9",
  "checked_bag_weight": "50lbs",
  "checked_bag_size": "62 Inches"
},

    # You can add more test data items here
]

# Insert test data into the collection
baggage_info_collection.insert_many(test_data)

# Close the connection
client.close()
