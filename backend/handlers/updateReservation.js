"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// updates a specified reservation
const updateReservation = async (req, res) => {  
    try {
        // Extract the reservation ID and new seat number from the request body
        const { _id } = req.body;
        const { seat } = req.body;
    
        // Ensure that reservationId and newSeat are provided in the request body
        if (!_id || !seat) {
          return res.status(400).json({ status: 400, message: "Reservation ID and new seat are required" });
        }
    
        // Connect to the MongoDB database
        const client = new MongoClient(MONGO_URI, options);
        await client.connect();
        const db = client.db("slingair");
    
        // Find the existing reservation
        const existingReservation = await db.collection("reservations").findOne({ _id: _id });
    
        // Check if the reservation exists
        if (!existingReservation) {
          return res.status(404).json({ status: 404, message: "Reservation not found" });
        }
    
        // Update the reservation document
        const updateResult = await db.collection("reservations").updateOne(
          { _id: _id },
          { $set: { seat: seat } }
        );
    
        // Check if the reservation was successfully updated
        if (updateResult.modifiedCount === 1) {
          // Reservation updated successfully
          res.status(200).json({ status: 200, message: "Reservation updated successfully" });
        } else {
          // Reservation not found or failed to update
          res.status(404).json({ status: 404, message: "Reservation not foundd" });
        }
    
        // Close the database connection
        await client.close();
      } catch (error) {
        // Handle any errors
        console.error("Error updating reservation:", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
      }
    };
module.exports = updateReservation;
