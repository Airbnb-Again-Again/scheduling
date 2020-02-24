const moment = require("moment");
const cassandra = require("cassandra-driver");
const client = new cassandra.Client({
  contactPoints: ["localhost"],
  keyspace: "schedule"
});

let dates = [];
const makeDates = () => {
  let reservedDates = [];
  let day = Math.floor(Math.random() * Math.floor(30));
  let month = Math.floor(Math.random() * Math.floor(6));
  let twoOrThree = Math.floor(Math.random() * Math.floor(12));

  for (let i = 0; i < twoOrThree; i++) {
    reservedDates.push(moment(new Date(2020, month, day + i)).format("L"));
  }
  dates = reservedDates;
};

// DB HELPERS FOR API REQUESTS

// CREATE
const addBooking = cb => {
  makeDates();
  let query = `INSERT INTO listing (booking_id, reservation_start, reservation_end, email) VALUES (uuid(), ${
    dates[0]
  }, ${dates[dates.length - 1]}} )`;
  client.execute(query).then(result => {
    console.log("booking successfully added :)");
  });
};

// READ

const readBooking = (listing, cb) => {
  let query = "SELECT * FROM listing WHERE key = ?";
  let search = [listing];
  client.execute(query, [listing]).then(result => {
    console.log("booking successfully read: ", result);
    //cb(result);
  });
};

// UPDATE
const updateBooking = (listing, field, updateInfo, cb) => {
  let findListingId = "SELECT listing_id WHERE...";
  client.execute;
  let query = `UPDATE listing SET ${field} = ${updateInfo} WHERE listing_id = ${listing}`;
  client.execute(query).then(result => {
    console.log("updated " + listing + " successfully");
    cb(result);
  });
};

//DELETE
const removeListing = (listing, cb) => {
  let query = "DELETE * FROM listing WHERE listing_id=${listing}";
  client.execute(query).then(result => {
    console.log("successfully deleted: ", listing, " :)");
  });
};

module.exports = {
  retrieveCollection
};
