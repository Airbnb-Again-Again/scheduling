require("newrelic");
const moment = require("moment");
const cassandra = require("cassandra-driver");
const client = new cassandra.Client({
  contactPoints: ["54.183.120.220"],
  localDataCenter: "us-west-1",
  keyspace: "sdc"
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

// test table creation
const test = cb => {
  let query = `create table `;
};

// CREATE
const addBooking = cb => {
  makeDates();
  let query = `INSERT INTO listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, rating_score, reserved_start, reserved_end, max_guests, cleaning_fee, service_fee, occupancy_fee, adults, children, infants) VAlUES (444444444, 4444444, 4444444, 'strict', 'true', 'true', 199, 444, 'Kevin G', 4.44, ${
    dates[0]
  }, ${dates[dates.length - 1]}, 4, 44, 44, 44, 4, 4, 4)`;
  // `INSERT INTO listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, rating_score, reserved_start, reserved_end, max_guests, cleaning_fee, service_fee, occupancy_fee, adults, children, infants) VAlUES (444444444, 4444444, 4444444, 'strict', 'true', 'true', 199, 444, 'Kevin G', 4.44, ${date[0]}, ${dates[dates.length - 1]}, 4, 44, 44, 44, 4, 4, 4)`;
  client.execute(query).then(result => {
    console.log("booking successfully added :)");
  });
};

// READ
const readBooking = cb => {
  let query = "SELECT * FROM listing";
  let search = [listing];
  client.execute(query, [listing]).then(result => {
    console.log("booking successfully read: ", result);
    //cb(result);
  });
};

// UPDATE
const updateBooking = (listing, field, updateInfo, cb) => {
  let findListingId = "SELECT listing_id WHERE";
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

addBooking();

module.exports = {
  addBooking,
  readBooking,
  updateBooking,
  removeListing
};
