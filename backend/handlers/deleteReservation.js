"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// deletes a specified reservation
const deleteReservation = async (req, res) => {

    const _id = req.params._id;

    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
  
      const db = client.db("slingair");
  
      // Check if reservation exists
      const existingReservation = await db.collection("reservations").findOne({ id: _id });
  
      if (!existingReservation) {
        return res.status(404).json({ status: 404, message: "Reservation not found." });
      }
  
      // Delete reservation
      const deleteResult = await db.collection("reservations").deleteOne({ id: _id });
  
      if (deleteResult.deletedCount === 1) {
        // Update seat availability in the flights collection
        const flightNumber = existingReservation.flight;
        const seatId = existingReservation.seat;
  
        await db.collection("flightNumber").updateOne(
          { flight: flightNumber, "seats.id": seatId },
          { $set: { "seats.$.isAvailable": true } }
        );
  
        res.status(200).json({ status: 200, message: "Reservation deleted." });
      } else {
        res.status(500).json({ status: 500, message: "Error deleting reservation." });
      }
      client.close();
    } catch (error) {
      console.error("Error deleting reservation:", error);
      res.status(500).json({ status: 500, message: "Internal server error." });
    } 
  };
  
module.exports = deleteReservation;
