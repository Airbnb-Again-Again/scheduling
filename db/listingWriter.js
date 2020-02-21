const fs = require("fs");
const path = require("path");
const moment = require("moment");

// COPY listing(listing_id, review_count, rating, cost_per_night, clean_fee, service_fee, occupancy_fee, max_guests, host_id) FROM '/Users/kevingutierrez/hackreactor/SDC/pgListing.csv' DELIMITER ',' CSV HEADER;

const listingWriter = fs.createWriteStream("../pgListing.csv");
listingWriter.write(
  "listing_id, review_count, rating, cost_per_night, clean_fee, service_fee, occupancy_fee, max_guests, host_id\n",
  "utf8"
);

let writeCsv = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  let write = () => {
    let ok = true;
    do {
      let randomAmountOfTrips = Math.floor(Math.random() * Math.floor(13) + 1);
      i -= 1;
      id++;
      let host_id = id;
      let accomodation_id = id;
      let cost_per_night = [99, 89, 79, 110, 99, 149, 199, 299, 89, 119][
        Math.floor(Math.random() * Math.floor(9))
      ];
      let reviews_count = Math.round(Math.random() * Math.floor(500));
      let rating_score = (4 + Math.random(5)).toFixed(2);
      let cleaning_fee = [29, 39, 59][
        Math.floor(Math.random() * Math.floor(3))
      ];
      let service_fee = [19, 29][Math.floor(Math.random() * Math.floor(2))];
      let occupancy_fee = [19, 29][Math.floor(Math.random() * Math.floor(2))];
      let max_guests = [3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16][
        Math.floor(Math.random() * Math.floor(12))
      ];
      let data = `${accomodation_id}, ${reviews_count}, ${rating_score}, ${cost_per_night}, ${cleaning_fee}, ${service_fee}, ${occupancy_fee}, ${max_guests}, ${host_id}\n`;
      if (i === 0) {
        writer.write(data, encoding, cb);
      } else {
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once("drain", write);
    }
  };
  write();
};

writeCsv(listingWriter, "utf-8", () => {
  listingWriter.end();
});
