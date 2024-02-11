"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// returns all reservations
const getFlight = async(req, res) => {
    const flightNumber = req.params.flight;
   try {
    const client = new MongoClient(MONGO_URI, options);
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to the database");
   

    // Access the "slingairData" database
    const db = client.db("slingair");
    const collection = db.collection("flightNumber");
    const flightData = await collection.findOne({ flight: req.params.flight });
    // Send the flight numbers as a response
    if (flightData) {
        res.status(200).json({ status: 200, data: flightData.seats, message: "list of seats "});
      } else {
        // If flight data is not found, send a 404 error response
        res.status(404).json({ error: "Flight not found" });
      }
    
    await client.close();
    console.log("Disconnected from the database");
  } catch (err) {
    console.error("Error retrieving flight numbers:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } 
};
module.exports = getFlight;
