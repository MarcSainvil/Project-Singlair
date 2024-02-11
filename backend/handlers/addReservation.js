"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// creates a new reservation
const addReservation = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("slingair");
    console.log("connected!");

    // Generate a unique ID for the reservation
    const reservationId = uuidv4();

    // Extract flight and seat information from the request body
    const { flight, seat } = req.body;

    // Update the reservation document with the generated ID
    const reservationData = { _id: reservationId, ...req.body };

    // Insert the reservation document into the reservations collection
    const reservationResult = await db.collection("reservations").insertOne(reservationData);

    // Update the seat status in the flight collection
    const updateResult = await db.collection("flightNumber").updateOne(
      { flight: flight, "seats.id": seat },
      { $set: { "seats.$.isAvailable": false } }
    );

    if (reservationResult && updateResult) {
      // Reservation and seat update successful
      res.status(201).json({ status: 201, data: reservationData, message: "Reservation added successfully" });
    } else {
      // Handle errors if either reservation or seat update fails
      res.status(500).json({ status: 500, message: "Failed to add reservation" });
    }

    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
};
module.exports = addReservation;
