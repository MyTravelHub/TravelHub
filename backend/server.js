const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the CORS middleware

dotenv.config();

const app = express();
app.use(cors()); // Use CORS middleware to handle cross-origin requests

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

run();

// Define a ping route
app.get('/ping', (req, res) => {
  res.send('Server is alive!');
});

// Import and use the search route
const searchRoute = require('./Routes/Search'); 
app.use('/search', searchRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
