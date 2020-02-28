const path = require("path");
const express = require("express");
const {
  addBooking,
  removeListing,
  updateBooking,
  readBooking,
  readAllBookings
} = require("../db/index.js");

const port = "3000";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(path.join(__dirname, '../client'))
app.use(express.static(path.join(__dirname, "../client", "dist")));

// Add one booking to a listing by listing id
app.post("/api/listings/listing_id/:booking_id", (req, res) => {
  console.log(req.params.booking_id);
  addBooking(req.params.booking_id, result => {
    res.send("good job :)");
  });
});

// Read all bookings for current listing shown by the listing id.
app.get("/api/listings/:listing_id/bookings", (req, res) => {
  readAllBookings(result => {
    res.send(result);
  });
});

// Read one booking for current listing by the booking id.
app.get("/api/listings/:listing_id/bookings/:booking_id", (req, res) => {
  let searchedListing = req.params.booking_id;
  readBooking(searchedListing => {
    res.send(result);
  });
});

// Update one booking by booking id.
app.put("/api/listings/:listing_id/bookings/:booking_id", (req, res) => {
  updateBooking(result => {
    res.sendStatus(200);
  });
});

// Delete one booking by booking id
app.delete("/api/bookings/booking_id/:listing_id", (req, res) => {
  removeListing(result => {
    res.sendStatus(200);
  });
});

app.listen(port, () => console.log("listening on port: " + port));
