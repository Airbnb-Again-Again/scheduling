const fs = require("fs");
const arrayCsvWriter = require("csv-writer").createArrayCsvWriter;
const path = require("path");
const moment = require("moment");

const createCsvWriter = require("csv-writer").createArrayCsvWriter;
const csvWriter = createCsvWriter({
  header: [
    "listing_id",
    "cost_per_night",
    "review_count",
    "rating",
    "reserved_dates",
    "reserved_guest",
    "max_guests",
    "clean_fee",
    "service_fee",
    "occupancy_fee"
  ],
  path: "/Users/kevinwgutierrez/hackreactor/SDC/cassandra.csv"
});

let dates = [];

const makeDates = () => {
  let reservedDates = [];
  let day = Math.floor(Math.random() * Math.floor(30));
  let month = Math.floor(Math.random() * Math.floor(6));
  let twoOrThree = Math.floor(Math.random() * Math.floor(12));

  for (let i = 0; i < twoOrThree; i++) {
    dates.push(moment(new Date(2020, month, day + i)).format("L"));
  }
  return reservedDates;
};

for (let d = 0; d < 25; d++) {
  makeDates();
}

// LISTING RECORDS
for (var i = 0; i < 1000; i++) {
  listingRecords.push([
    "listing_id",
    i,
    "cost_per_night",
    [99, 89, 79, 110, 99, 149, 199, 299, 89, 119][
      Math.floor(Math.random() * Math.floor(9))
    ],
    "review_count",
    Math.round(Math.random() * Math.floor(500)),
    "rating",
    (4 + Math.random(5)).toFixed(2),
    "reserved_dates",
    dates,
    "max_guests"[(3, 4, 5, 6, 7)][Math.floor(Math.random() * Math.floor(5))],
    "clean_fee",
    [29, 39, 59][Math.floor(Math.random() * Math.floor(3))],
    "service_fee",
    [19, 29][Math.floor(Math.random() * Math.floor(2))],
    "occupancy_fee",
    [19, 29][Math.floor(Math.random() * Math.floor(2))]
  ]);
}
const listingRecords = [];

csvWriter.writeRecords(records).then(() => {
  console.log("...Done");
});
