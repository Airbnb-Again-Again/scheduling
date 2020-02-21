CREATE KEYSPACE schedule WITH replication={'class' : 'SimpleStrategy', 'replication_factor' : 3 };
CREATE TABLE listing (accomodation_id  INT, cost_per_night INT, reviews_count INT, rating_score INT, reserved_start TEXT, reserved_end TEXT, max_guests INT, cleaning_fee INT, service_fee INT, occupancy_fee INT, PRIMARY KEY (accomodation_id));

CREATE TABLE listing (accomodation_id INT, cost_per_night INT, reviews_count INT, rating_score FLOAT, reserved_start TEXT, reserved_end TEXT, max_guests INT, cleaning_fee INT, service_fee INT, occupancy_fee INT, PRIMARY KEY (accomodation_id));