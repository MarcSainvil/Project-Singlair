"use strict";


const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// returns a single reservation
const getSingleReservation = async(req, res) => {
    const _id  = req.params._id;
    console.log(_id)

    try {
      const client = new MongoClient(MONGO_URI, options);
      await client.connect();
  
      const db = client.db("slingair");
      const collection = db.collection("reservations");
  
      const reservation = await collection.findOne({ id: _id });
  
      if (!reservation) {
        res.status(404).json({ message: "Reservation not found" });
        return;
      }
  
      res.status(200).json({ status: 200, data: {reservation}, message: "here's your reservation "  });
       
        await client.close();
        console.log("Disconnected from the database");
      } catch (err) {
        console.error("Error retrieving flight numbers:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } 
    };

module.exports = getSingleReservation;
