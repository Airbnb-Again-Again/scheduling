const fs = require("fs");
const path = require("path");
const moment = require("moment");

const listingWriter = fs.createWriteStream("../pgListing.csv");
listingWriter.write(
  "listing_id, review_count, rating, cost_per_night, clean_fee, service_fee, occupancy_fee, max_guests, host_id\n",
  "utf8"
);

const bookingWriter = fs.createWriteStream("../pgBooking.csv");
bookingWriter.write(
  "booking_id, guests, reserved_start, reserved_end\n",
  "utf8"
);

const usersWriter = fs.createWriteStream("../pgUsers.csv");
usersWriter.write("user_id, booking_id\n", "utf8");

// create table listing (listing_id integer, review_count integer, rating integer, cost_per_night integer, clean_fee integer, service_fee integer, occupancy_fee integer, max_guests integer, host_id integer, primary key (listing_id, host_id), foreign key (host_id) references users (user_id));
// create table booking (booking_id integer, guests integer, reserved_start varchar(13), reserved_end varchar(13), primary key (booking_id));
// create table users (user_id integer UNIQUE, booking_id integer, primary key (user_id, booking_id), foreign key (booking_id) references booking(booking_id));
// create table owner (owner_id integer, listing_id integer, foreign key (owner_id) references users (user_id))

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
let writeCsv = (writer1, writer2, writer3, encoding, cb) => {
  let i = 10000000;
  let accomId = 0;
  let userId = 100;
  let bookingId = userId * 3 * Math.random();
  let write = () => {
    let ok = true;
    do {
      generateNewReservedDates();
      let randomAmountOfTrips = Math.floor(Math.random() * Math.floor(13) + 1);
      i -= 1;
      accomId++;
      userId += 3;
      let accomodation_id = accomId;
      let user_id = userId;
      let host_id = Math.ceil(
        Math.random * accomId + Math.floor(Math.random() * 5)
      );
      let booking_id = bookingId;
      let cost_per_night = [99, 89, 79, 110, 99, 149, 199, 299, 89, 119][
        Math.floor(Math.random() * Math.floor(9))
      ];
      let reviews_count = Math.round(Math.random() * Math.floor(500));
      let rating_score = (4 + Math.random(5)).toFixed(2);
      let max_guests = [3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16][
        Math.floor(Math.random() * Math.floor(12))
      ];
      let cleaning_fee = [29, 39, 59][
        Math.floor(Math.random() * Math.floor(3))
      ];
      let service_fee = [19, 29][Math.floor(Math.random() * Math.floor(2))];
      let occupancy_fee = [19, 29][Math.floor(Math.random() * Math.floor(2))];
      let data1 = `${accomodation_id}, ${reviews_count}, ${rating_score}, ${cost_per_night}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, ${max_guests}, ${host_id}\n`;
      let data3 = `${user_id}, ${accomodation_id}\n`;
      //   let reserved_start = dates[0];
      //   let reserved_end = dates[dates.length - 1];
      //let data = `${accomodation_id}, ${cost_per_night}, ${reviews_count}, ${rating_score}, ${reserved_start}, ${reserved_end}, ${max_guests}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}\n`;
      if (i === 0) {
        for (var j = 0; j <= randomAmountOfTrips; j++) {
          let max = dates.length - 1;
          let reserved_end = dates[Math.floor(Math.random() * max)];
          let reserved_start = dates[Math.floor((max / 5) * Math.random())];
          let data2 = `${booking_id}, ${reserved_start}, ${reserved_end}\n`;
          writer1.write(data1, encoding, cb);
          writer2.write(data2, encoding, cb);
          writer3.write(data3, encoding, cb);
        }
      } else {
        for (var j = 0; j <= randomAmountOfTrips; j++) {
          let max = dates.length - 1;
          let reserved_end = dates[Math.floor(Math.random() * max)];
          let reserved_start = dates[Math.floor((max / 5) * Math.random())];
          let data2 = `${booking_id}, ${max_guests}, ${reserved_start}, ${reserved_end}\n`;
          ok = writer1.write(data1, encoding, cb);
          ok = writer2.write(data2, encoding, cb);
          ok = writer3.write(data3, encoding, cb);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer1.once("drain", write);
      writer2.once("drain", write);
      writer3.once("drain", write);
    }
  };
  write();
};

writeCsv(listingWriter, bookingWriter, usersWriter, "utf-8", () => {
  listingWriter.end();
  bookingWriter.end();
  usersWriter.end();
});

// writeCsv(bookingWriter, "utf-8", () => {
//   bookingWriter.end();
// });

// writeCsv(usersWriter, "utf-8", () => {
//   usersWriter.end();
// });
