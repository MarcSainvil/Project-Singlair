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
const getReservations = async(req, res) => {
    try {
        const client = new MongoClient(MONGO_URI, options);
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected to the database");
    
        // Access the "slingairData" database
        const db = client.db("slingair");
    
        // Query the "flights" collection to retrieve all flight numbers
        const reservations = await db.collection("reservations").find().toArray();
    
        // Send the reservations  as a response
       
        res.status(200).json({ status: 200, data: {reservations: reservations}, message: "list of reservations "  });
        await client.close();
        console.log("Disconnected from the database");
      } catch (err) {
        console.error("Error retrieving flight numbers:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } 
    };

module.exports = getReservations;
