const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { flights, reservations } = require("./backend/data.js");

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Function to connect to the MongoDB database and insert flights and reservations data
const batchImport = async () => {
  // Create a new MongoClient
  const client = new MongoClient(MONGO_URI, options);

  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to the database");

    // Access the "slingairData" database
    const db = client.db("slingair");

    // Insert flights data
    for (const flightNumber in flights) {
      if (flights.hasOwnProperty(flightNumber)) {
        const seats = flights[flightNumber];
        await db.collection("flightNumber").insertOne({
          _id: flightNumber, // Use flightNumber as the _id
          flight: flightNumber,
          seats: seats,
        });
        console.log(`Flight ${flightNumber} inserted successfully`);
      }
    }

    // Insert reservations data
    await db.collection("reservations").insertMany(reservations);
    console.log("Reservations inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    // Close the MongoDB connection
    await client.close();
    console.log("Disconnected from the database");
  }
};

// Call the batchImport function to start the import process
batchImport();