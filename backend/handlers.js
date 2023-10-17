const getFlights = require("./handlers/getFlights");
const getFlight = require("./handlers/getFlight");
const getReservations = require("./handlers/getReservations");
const addReservation = require("./handlers/addReservation");
const getSingleReservation = require("./handlers/getSingleReservation");
const deleteReservation = require("./handlers/deleteReservation");
const updateReservation = require("./handlers/updateReservation");

module.exports = {
  getFlights,
  getFlight,
  getReservations,
  addReservation,
  getSingleReservation,
  deleteReservation,
  updateReservation,
};
