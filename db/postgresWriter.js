const fs = require("fs");
const path = require("path");
const { Pool, Client } = require("pg");
var copyFrom = require("pg-copy-streams").from;
const config = "./congfig.js";

var inputFile = path.join(__dirname, "../../postgresql.csv");
var table = "usermanaged.customers";

const host = config.host;
const user = config.user;
const pw = config.pw;
const db = config.db;
const port = config.port;
const conString = `postgres://${user}:@${host}:${port}/${db}`;
// `postgres://${user}:${pw}@${host}:${port}/${db}`

// Connecting to Database
const client = new Client({
  connectionString: conString
});
client.connect();
// Execute Copy Function
var stream = client.query(
  copyFrom(`COPY ${targetTable} FROM CSV HEADER STDIN`)
);
var fileStream = fs.createReadStream(inputFile);

fileStream.on("error", error => {
  console.log(`Error in reading file: ${error}`);
});
stream.on("error", error => {
  console.log(`Error in copy command: ${error}`);
});
stream.on("end", () => {
  console.log(`Completed loading data into ${targetTable}`);
  client.end();
});
fileStream.pipe(stream);

var pool = new Pool();
pool.connect((err, client, done) => {
  var stream = client.query(copyFrom("COPY  FROM STDIN"));
  var fileStream = fs.createReadStream("pSeed1.csv");
  fileStream.on("error", done);
  stream.on("error", done);
  stream.on("end", done);
  fileStream.pipe(stream);
});

// create table listing (listing_id integer, review_count integer, rating float, cost_per_night integer, clean_fee integer, service_fee integer, occupancy_fee integer, max_guests integer, host_id integer, primary key (listing_id, host_id), foreign key (host_id) references users (user_id));
// create table booking (booking_id integer, guests integer, reserved_start varchar(13), reserved_end varchar(13), primary key (booking_id));
// create table users (user_id integer UNIQUE, booking_id integer, primary key (user_id, booking_id), foreign key (booking_id) references booking(booking_id));
// create table owner (owner_id integer, listing_id integer, foreign key (owner_id) references users (user_id))
