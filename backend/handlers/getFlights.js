"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


// Function to retrieve flight numbers from the database
const getFlights = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to the database");

    // Access the "slingairData" database
    const db = client.db("slingair");

    // Query the "flights" collection to retrieve all flight numbers
    const flightDocuments = await db.collection("flightNumber").find().toArray();
const flightNumbers = flightDocuments.map(flight => flight.flight);
 // Retrieve unique flight numbers

    // Send the flight numbers as a response
   
    res.status(200).json({ status: 200, data: flightNumbers, message: "list of flights "  });
    await client.close();
    console.log("Disconnected from the database");
  } catch (err) {
    console.error("Error retrieving flight numbers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } 
};
module.exports = getFlights;