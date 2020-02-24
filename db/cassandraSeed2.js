const fs = require("fs");
const path = require("path");
const moment = require("moment");
const faker = require("faker");

const scheduleWriter = fs.createWriteStream("../cassandra.csv");
scheduleWriter.write(
  "booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, rating_score, reserved_start, reserved_end, max_guests, cleaning_fee, service_fee, occupancy_fee, adults, children, infants\n",
  "utf8"
);

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
  let i = 10000000;
  let id = 0;

  let write = () => {
    let ok = true;
    do {
      generateNewReservedDates();
      let randomAmountOfTrips = Math.floor(Math.random() * Math.floor(13) + 1);
      i -= 1;
      id++;
      if (i / 1000 === 0) {
        console.log("entry number: ", i);
      }
      let host_id = Math.floor(Math.random() * 100000000);
      let booking_id = id;
      let cost_per_night = [99, 89, 79, 110, 99, 149, 199, 299, 89, 119][
        Math.floor(Math.random() * Math.floor(9))
      ];
      let reviews_count = Math.round(Math.random() * Math.floor(500));
      let rating_score = (4 + Math.random(5)).toFixed(2);
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
      // let data = `${booking_id}, ${host_id}, ${listing_id}, ${cancellation_policy}, ${smoking_allowed}, ${pets_allowed}, ${cost_per_night}, ${reviews_count}, ${guest_name}, ${rating_score}, ${reserved_start}, ${reserved_end}, ${max_guests}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, ${adults}, ${children}, ${infants}\n`;
      if (i === 0) {
        for (var j = 0; j <= randomAmountOfTrips; j++) {
          let max = dates.length - 1;
          let guest_name = faker.name.findName();
          let reserved_end = dates[Math.floor(Math.random() * max)];
          let reserved_start = dates[Math.floor((max / 5) * Math.random())];
          let listing_id = id / 2 + Math.floor(Math.random() * 100000);
          let adults = Math.floor(Math.random() * 8);
          let infants = Math.floor(Math.random() * 7);
          let children = Math.floor(Math.random() * 6);
          let data = `${booking_id}, ${host_id}, ${listing_id}, ${cancellation_policy}, ${smoking_allowed}, ${pets_allowed}, ${cost_per_night}, ${reviews_count}, ${guest_name}, ${rating_score}, ${reserved_start}, ${reserved_end}, ${max_guests}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, ${adults}, ${children}, ${infants}\n`;
          writer.write(data, encoding, cb);
        }
      } else {
        for (var j = 0; j <= randomAmountOfTrips; j++) {
          let max = dates.length - 1;
          let adults = Math.floor(Math.random() * 8);
          let guest_name = faker.name.findName();
          let infants = Math.floor(Math.random() * 7);
          let children = Math.floor(Math.random() * 6);
          let listing_id = id / 2 + Math.floor(Math.random() * 100000);
          let reserved_end = dates[Math.floor(Math.random() * max)];
          let reserved_start = dates[Math.floor((max / 5) * Math.random())];
          let data = `${booking_id}, ${host_id}, ${listing_id}, ${cancellation_policy}, ${smoking_allowed}, ${pets_allowed}, ${cost_per_night}, ${reviews_count}, ${guest_name}, ${rating_score}, ${reserved_start}, ${reserved_end}, ${max_guests}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, ${adults}, ${children}, ${infants}\n`;
          ok = writer.write(data, encoding);
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once("drain", write);
    }
  };
  write();
};

writeCsv(scheduleWriter, "utf-8", () => {
  scheduleWriter.end();
});

// table creation command:
// create table listing (booking_id INT, host_id INT, listing_id float, cancellation_policy TEXT, smoking_allowed TEXT, pets_allowed TEXT, cost_per_night INT, reviews_count INT, guest_name TEXT, rating_score float, reserved_start TEXT, reserved_end TEXT, max_guests INT, cleaning_fee INT, service_fee INT, occupancy_fee INT, adults INT, children INT, infants INT, primary key (listing_id, booking_id, host_id));

// insert csv command:
// copy listing (booking_id, host_id, listing_id, cancellation_policy, smoking_allowed, pets_allowed, cost_per_night, reviews_count, guest_name, rating_score, reserved_start, reserved_end, max_guests, cleaning_fee, service_fee, occupancy_fee, adults, children, infants) from 'cassandra.csv' with header=true;
