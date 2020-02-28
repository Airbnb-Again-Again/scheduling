const fs = require("fs");
const path = require("path");
const moment = require("moment");
const faker = require("faker");

// CREATE KEYSPACE sdc WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

// const scheduleWriter = fs.createWriteStream("../cassandra.csv");
// scheduleWriter.write(
//   "booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, listing_rating, reserved_start, reserved_end, max_guests,  $reviews_count}cleaning_fee, service_fee, occupancy_fee, adults, children, infants\n",
//   "utf8"
// );

// const guestWriter = fs.createWriteStream("../guest.csv");
// guestWriter.write("guest_id, name, guest_rating\n", "utf8");

// create table guest (guest_id int primary key, guest_name text, guest_rating float);
// copy guest (guest_id, guest_name, guest_rating) from 'guest.csv' with header=true;

// const guestNameWriter = fs.createWriteStream("../guestName.csv");
// guestNameWriter.write("guest_name, guest_id\n", "utf8");
// create table guest_name (guest_name text, guest_id int, primary key(guest_name, guest_id));
// copy guest_name (guest_name, guest_id) from 'guestName.csv' with header=true;

const bookingWriter = fs.createWriteStream("../booking.csv");
bookingWriter.write(
  "booking_id, listing_id, reserved_start, reserved_end, guest_id, guest_name, host_id, host_name, adults, children, infants\n",
  "utf8"
);
// create table booking (booking_id int, listing_id int, reserved_start text, reserved_end text, guest_id int, guest_name text, host_id int, host_name text, adults int, children int, infants int, primary key(booking_id, listing_id, guest_id));
// copy booking (booking_id, listing_id, reserved_start, reserved_end, guest_id, guest_name, host_id, host_name, adults, children, infants) from 'booking.csv' with header=true;

// const bookingNameWriter = fs.createWriteStream("../bookingName.csv");
// bookingNameWriter.write(
//   "guest_name, guest_id, booking_id, reserved_start, reserved_end, guest_rating, host_id, host_name, listing_id, adults, children, infants\n",
//   "utf8"
// );
// create table booking_name (guest_name text, guest_id int, booking_id int, listing_id int, reserved_start text, reserved_end text, host_id int, host_name text, guest_rating float, adults int, children int, infants int, primary key (guest_id, reserved_start, host_name));
// copy booking_name (guest_name, guest_id, booking_id, reserved_start, reserved_end, guest_rating, host_id, host_name, listing_id, adults, children, infants) from 'bookingName.csv' with header=true;

const listingWriter = fs.createWriteStream("../listing.csv");
listingWriter.write(
  "listing_id, host_id, host_name, cost_per_night, listing_rating, cancellation_policy, smoking_allowed, pets_allowed, max_guests, reviews_count, cleaning_fee, service_fee, occupancy_fee\n",
  "utf8"
);
// create table listing (listing_id int, host_id int, host_name text, cost_per_night int, listing_rating float, cancellation_policy text, smoking_allowed text, pets_allowed text, max_guests int, reviews_count int, cleaning_fee int, service_fee int, occupancy_fee int, primary key (listing_id, host_id, host_name));
// copy listing (listing_id, host_id, host_name, cost_per_night, listing_rating, cancellation_policy, smoking_allowed, pets_allowed, max_guests, reviews_count, cleaning_fee, service_fee, occupancy_fee) from 'listing.csv' with header=true;

let tripLength = [1, 1, 2, 2, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9];
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

let generateNewReservedDates = () => {
  for (let d = 0; d < 15; d++) {
    makeDates();
  }
};
let writeCsv = (writer, encoding, cb) => {
  let i = 5000000;
  let id = 0;

  let write = () => {
    let ok = true;
    if (i % 5 === 0) {
      generateNewReservedDates();
    }
    do {
      let randomAmountOfTrips = Math.floor(Math.random() * Math.floor(6) + 1);
      i -= 1;
      id++;
      let host_name = faker.name.findName();
      let host_id = Math.floor(Math.random() * 100000000);
      let booking_id = id;
      let listing_id = i;
      let cost_per_night = [99, 89, 79, 110, 99, 149, 199, 299, 89, 119][
        Math.floor(Math.random() * Math.floor(9))
      ];

      let reviews_count = Math.round(Math.random() * Math.floor(500));
      let listing_rating = (4 + Math.random(5)).toFixed(2);
      let guest_rating = (4 + Math.random(5)).toFixed(2);
      let max_guests = [3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16][
        Math.floor(Math.random() * Math.floor(12))
      ];
      let cancellation_policy = ["strict", "moderate", "flexible"][
        Math.floor(Math.random() * 3)
      ];
      let smoking_allowed = ["true", "false"][Math.floor(Math.random() * 2)];
      let pets_allowed = ["true", "false"][Math.floor(Math.random() * 2)];
      let cleaning_fee = [29, 39, 59][
        Math.floor(Math.random() * Math.floor(3))
      ];
      let service_fee = [19, 29][Math.floor(Math.random() * Math.floor(2))];
      let occupancy_fee = [19, 29][Math.floor(Math.random() * Math.floor(2))];
      //   let reserved_start = dates[0];
      //   let reserved_end = dates[dates.length - 1];
      // let data = `${booking_id}, ${host_id}, ${listing_id}, ${cancellation_policy}, ${smoking_allowed}, ${pets_allowed}, ${cost_per_night}, ${reviews_count}, ${guest_name}, ${listing_rating}, ${reserved_start}, ${reserved_end}, ${max_guests}, $reviews_count} ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, ${adults}, ${children}, ${infants}\n`;
      if (i === 0) {
        let listingData = `${listing_id}, ${host_id}, ${host_name}, ${cost_per_night}, ${listing_rating}, ${cancellation_policy}, ${smoking_allowed}, ${pets_allowed}, ${max_guests}, ${reviews_count}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}\n`;
        listingWriter.write(listingData, encoding, cb);
        for (var j = 0; j <= randomAmountOfTrips; j++) {
          makeDates();
          let max = dates.length - 1;
          let guest_name = faker.name.findName();
          let guest_id = Math.floor(Math.random() * 100000000);
          let reserved_end = dates[Math.floor(Math.random() * max)];
          let reserved_start = dates[Math.floor((max / 5) * Math.random())];
          let adults = Math.floor(Math.random() * 8);
          let infants = Math.floor(Math.random() * 7);
          let children = Math.floor(Math.random() * 6);

          let bookingData = `${booking_id}, ${listing_id}, ${reserved_start}, ${reserved_end}, ${guest_id}, ${guest_name}, ${host_id}, ${host_name}, ${adults}, ${children}, ${infants}\n`;
          // let bookingNameData = `${guest_name}, ${guest_id}, ${booking_id}, ${reserved_start}, ${reserved_end}, ${guest_rating}, ${host_id}, ${host_name}, ${listing_id}, ${adults}, ${children}, ${infants}\n`;
          // let guestData = `${guest_id}, ${guest_name}, ${guest_rating}\n`;
          // let guestNameData = `${guest_name}, ${guest_id}\n`;

          // bookingNameWriter.write(bookingNameData, encoding, cb);
          bookingWriter.write(bookingData, encoding, cb);
          // guestWriter.write(guestData, encoding, cb);
          // guestNameWriter.write(guestNameData, encoding, cb);
        }
      } else {
        let listingData = `${listing_id}, ${host_id}, ${host_name}, ${cost_per_night}, ${listing_rating}, ${cancellation_policy}, ${smoking_allowed}, ${pets_allowed}, ${max_guests}, ${reviews_count}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}\n`;
        listingWriter.write(listingData, encoding, cb);
        for (var j = 0; j <= randomAmountOfTrips; j++) {
          makeDates();
          let max = dates.length - 1;
          let guest_name = faker.name.findName();
          let guest_id = Math.floor(Math.random() * 100000000);
          let reserved_end = dates[Math.floor(Math.random() * max)];
          let reserved_start = dates[Math.floor((max / 5) * Math.random())];
          let adults = Math.floor(Math.random() * 8);
          let infants = Math.floor(Math.random() * 7);
          let children = Math.floor(Math.random() * 6);

          let bookingData = `${booking_id}, ${listing_id}, ${reserved_start}, ${reserved_end}, ${guest_id}, ${guest_name}, ${host_id}, ${host_name}, ${adults}, ${children}, ${infants}\n`;
          // let bookingNameData = `${guest_name}, ${guest_id}, ${booking_id}, ${reserved_start}, ${reserved_end}, ${guest_rating}, ${host_id}, ${host_name}, ${listing_id}, ${adults}, ${children}, ${infants}\n`;
          // let guestData = `${guest_id}, ${guest_name}, ${guest_rating}\n`;
          // let guestNameData = `${guest_name}, ${guest_id}\n`;

          // bookingNameWriter.write(bookingNameData, encoding);
          bookingWriter.write(bookingData, encoding);
          // guestWriter.write(guestData, encoding);
          // guestNameWriter.write(guestNameData, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once("drain", write);
    }
  };
  write();
};

writeCsv(bookingWriter, "utf-8", () => {
  bookingWriter.end();
});

// table creation command:
// create table listing (booking_id INT, host_id INT, listing_id float, cancellation_policy TEXT, smoking_allowed TEXT, pets_allowed TEXT, cost_per_night INT, reviews_count INT, guest_name TEXT, listing_rating float, reserved_start TEXT, reserved_end TEXT, max_guests I $reviews_count}NT, cleaning_fee INT, service_fee INT, occupancy_fee INT, adults INT, children INT, infants INT, primary key (listing_id, booking_id, host_id));

// insert csv command:
// copy listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, listing_rating, reserved_start, reserved_end, max_guests,  $reviews_count}cleaning_fee, service_fee, occupancy_fee, adults, children, infants) from 'cassandra.csv' with header=true;

// INSERT INTO listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, listing_rating, reserved_start, reserved_end, max_guests,  $reviews_count}cleaning_fee, service_fee, occupancy_fee, adults, children, infants) VAlUES (444444444, 4444444, 4444444, 'strict', 'true', 'true', 199, 444, 'Kevin G', 4.44, '02/24/2020', '02/26/2020', 4, 44, 44, 44, 4, 4, 4);
