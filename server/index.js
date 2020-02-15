const path = require("path");
const express = require("express");
const { retrieveCollection } = require("../db/index.js");

const port = process.env.PORT || 3000;

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(path.join(__dirname, '../client'))
app.use(express.static(path.join(__dirname, "../client", "dist")));

app.get("/listings", (req, res) => {
  retrieveCollection(result => {
    res.send(result);
  });
});

app.get("/api/listings/listing_id/:listing_id", (req, res) => {
  let searchedListing = req.params.listing_id;
  retrieveOne(searchedListing => {
    res.send(result);
  });
});

app.post("/api/listings/listing_id/:newBooking", (req, res) => {
  retrieveCollection(result => {
    res.send(result);
  });
});

app.put("/api/listings/listing_id/:listing_id", (req, res) => {
  retrieveCollection(result => {
    res.send(result);
  });
});

app.delete("/api/listings/listing_id/:listing_id", (req, res) => {
  retrieveCollection(result => {
    res.send(result);
  });
});

app.listen(port, () => console.log("listening on port: " + port));
