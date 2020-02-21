//create table users (user_id integer UNIQUE, booking_id integer,
//primary key (user_id, booking_id), foreign key (booking_id) references booking(booking_id));

const fs = require("fs");
const path = require("path");
const moment = require("moment");

// COPY users(user_id, booking_id) FROM '/Users/kevingutierrez/hackreactor/SDC/pgUsers.csv' DELIMITER ',' CSV HEADER;

const userWriter = fs.createWriteStream("../pgUsers.csv");
userWriter.write("user_id, booking_id\n", "utf8");

let writeCsv = (writer, encoding, cb) => {
  let i = 10000000;
  let id = 0;
  let write = () => {
    let ok = true;
    do {
      i -= 1;
      id++;
      let user_id = id;
      let booking_id = id;
      let data = `${user_id}, ${booking_id}\n`;
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

writeCsv(userWriter, "utf-8", () => {
  userWriter.end();
});
