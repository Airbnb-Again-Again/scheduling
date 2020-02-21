//create table booking (booking_id integer, guests integer,
//reserved_start varchar(13), reserved_end varchar(13), primary key (booking_id));

const fs = require("fs");
const path = require("path");
const moment = require("moment");

// COPY booking(booking_id, guests, reserved_start, reserved_end) FROM '/Users/kevingutierrez/hackreactor/SDC/pgBooking.csv' DELIMITER ',' CSV HEADER;

const bookingWriter = fs.createWriteStream("../pgBooking.csv");
bookingWriter.write(
  "booking_id, guests, reserved_start, reserved_end\n",
  "utf8"
);
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

let writeCsv = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  let write = () => {
    makeDates();
    let ok = true;
    let max = dates.length - 1;
    do {
      let guests = Math.floor(Math.random() * Math.floor(14) + 1);
      i -= 1;
      id++;
      let reserved_end = dates[Math.floor(Math.random() * max)];
      let reserved_start = dates[Math.floor((max / 5) * Math.random())];
      let booking_id = id;
      let data = `${booking_id}, ${guests}, ${reserved_start}, ${reserved_end}\n`;
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

writeCsv(bookingWriter, "utf-8", () => {
  bookingWriter.end();
});
