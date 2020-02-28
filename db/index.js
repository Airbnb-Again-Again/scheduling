require("newrelic");
const moment = require("moment");
const { Client, auth } = require("cassandra-driver");
const client = new Client({
  // 127.0.0.1:9042
  contactPoints: ["54.193.82.18:9042"],
  //protocolOptions: { port: 9042 },
  localDataCenter: "us-west",
  keyspace: "sdc"
});
const faker = require("faker");

let randomData = {
  host_name() {
    return faker.name.findName();
  },
  host_id() {
    return Math.floor(Math.random() * 100000000);
  },
  booking_id() {
    return Math.floor(Math.random() * 100000000);
  },
  cost_per_night() {
    return [99, 89, 79, 110, 99, 149, 199, 299, 89, 119][
      Math.floor(Math.random() * Math.floor(9))
    ];
  },
  listing_id() {
    return Math.round(
      Math.random() * 1000 + Math.floor(Math.random() * 100000)
    );
  },
  reviews_count() {
    return Math.round(Math.random() * Math.floor(500));
  },
  listing_rating() {
    return (4 + Math.random(5)).toFixed(2);
  },
  guest_rating() {
    return (4 + Math.random(5)).toFixed(2);
  },
  max_guests() {
    return [3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16][
      Math.floor(Math.random() * Math.floor(12))
    ];
  },
  cancellation_policy() {
    return ["strict", "moderate", "flexible"][Math.floor(Math.random() * 3)];
  },
  smoking_allowed() {
    return ["true", "false"][Math.floor(Math.random() * 2)];
  },
  pets_allowed() {
    return ["true", "false"][Math.floor(Math.random() * 2)];
  },
  cleaning_fee() {
    return [29, 39, 59][Math.floor(Math.random() * Math.floor(3))];
  },
  service_fee() {
    return [19, 29][Math.floor(Math.random() * Math.floor(2))];
  },
  occupancy_fee() {
    return [19, 29][Math.floor(Math.random() * Math.floor(2))];
  },
  max() {
    return dates.length - 1;
  },
  guest_name() {
    return faker.name.findName();
  },
  guest_id() {
    return Math.floor(Math.random() * 100000000);
  },
  reserved_end() {
    return dates[Math.floor(Math.random() * this.max)];
  },
  reserved_start() {
    return dates[Math.floor((this.max / 5) * Math.random())];
  },
  adults() {
    return Math.floor(Math.random() * 8);
  },
  infants() {
    return Math.floor(Math.random() * 7);
  },
  children() {
    return Math.floor(Math.random() * 6);
  },
  randomDate() {
    return new Date(
      randomDay().getTime() +
        Math.random() * (randomDay.getTime() - randomDay.getTime())
    );
  }
};
let dates = [];
const makeDates = () => {
  let reservedDates = [];
  let day = Math.floor(Math.random() * Math.floor(30));
  let month = Math.floor(Math.random() * Math.floor(6));
  let twoOrThree = Math.floor(Math.random() * Math.floor(12));

  for (let i = 0; i < twoOrThree; i++) {
    reservedDates.push(moment(new Date(2020, month, day)).format("L"));
  }
  dates = reservedDates;
};
makeDates();

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
function randomDay() {
  let year = [2020, 2021][Math.random() * 2];
  let day = Math.floor(Math.random() * Math.floor(30));
  let month = Math.floor(Math.random() * Math.floor(6));
  return year, month, day;
}
let max = dates.length - 1;
// DB HELPERS FOR API REQUESTS

// test table creation
const generateTable = cb => {
  let query = `create table `;
};

// CREATE
const addBooking = (bookingId, cb) => {
  // let query = `INSERT INTO listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, rating_score, reserved_start, reserved_end, max_guests, cleaning_fee, service_fee, occupancy_fee, adults, children, infants) VAlUES (444444444, 4444444, 4444444, 'strict', 'true', 'true', 199, 444, 'Kevin G', 4.44, ${
  //   dates[0]
  // }, ${dates[dates.length - 1]}, 4, 44, 44, 44, 4, 4, 4)`;
  let query =
    `INSERT INTO booking (booking_id, listing_id, guest_id, guest_name, host_id, host_name, adults, children, infants, reserved_start, reserved_end)` +
    //` VALUES (${bookingId},${randomData.listing_id()}, ${randomData.guest_id()}, '${randomData.guest_name()}', ${randomData.host_id()}, '${randomData.host_name()}', ${randomData.adults()}, ${randomData.children()}, ${randomData.infants()}, '${randomData.reserved_start()}', '${randomData.reserved_end()}')`;
    `VALUES(${bookingId},2112443,124124,"Kev G","1241244","KGizzle",3,4,5,"02/28/2020","02/29/2020")`;
  // INSERT INTO booking_name (guest_name, guest_id, booking_id, reserved_start, reserved_end, guest_rating, host_id, host_name, listing_id, adults, children, infants) VALUES ()
  // `INSERT INTO listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, rating_score, reserved_start, reserved_end, max_guests, cleaning_fee, service_fee, occupancy_fee, adults, children, infants) VAlUES (444444444, 4444444, 4444444, 'strict', 'true', 'true', 199, 444, 'Kevin G', 4.44, ${date[0]}, ${dates[dates.length - 1]}, 4, 44, 44, 44, 4, 4, 4)`;
  client
    .execute(query)
    .then(result => {
      console.log("booking successfully added :)");
      cb("success message to server from db");
    })
    .catch(data => {
      console.log(data);
    });
};

// READ
const readOneBooking = (booking, cb) => {
  let query = `SELECT * FROM booking WHERE booking_id = 12392923`;
  client.execute(query).then(result => {
    console.log("booking successfully read: ", result);
    //cb(result);
  });
};

// get all bookings from a current listing
const readAllBookings = (listing, cb) => {
  let query = `SELECT * FROM booking WHERE listing_id = `;
  client.execute(query).then(result => {
    console.log("booking successfully read: ", result);
    //cb(result);
  });
};

// UPDATE
const updateBooking = (booking, field, info, cb) => {
  // let length = fieldArr.length - 1;
  // let filler1 = Array.apply(null, Array(length)).map(
  //   String.prototype.valueOf,
  //   "?"
  // );
  // let filler2 = Array.apply(null, Array(length)).map(
  //   String.prototype.valueOf,
  //   "?"
  // );
  let query = `UPDATE booking SET ${field} = ${info} WHERE booking_id = ${booking}`;
  client.execute(query).then(result => {
    console.log("updated booking with id: " + booking_id + " successfully");
    cb(result);
  });
};

//DELETE
const removeBooking = (booking, cb) => {
  let query = `DELETE * FROM listing WHERE booking_id=${booking}`;
  client.execute(query).then(result => {
    console.log("successfully deleted: ", booking, " :)");
  });
};

// addBooking();

module.exports = {
  addBooking,
  readOneBooking,
  updateBooking,
  removeBooking,
  readAllBookings
};
