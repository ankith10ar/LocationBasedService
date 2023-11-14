drop table if exists geolocation cascade;
drop table if exists business CASCADE;
create table business (
    id INTEGER PRIMARY KEY,
    name VARCHAR(30),
    address VARCHAR(255),
    type VARCHAR(15),
    contact VARCHAR(15),
    email VARCHAR(40),
    latitude DECIMAL(30,15),
    longitude DECIMAL(30,15)
);
create table geolocation (
    geo_id INTEGER PRIMARY KEY,
    geo geometry(Point, 4326),
    business_id INTEGER references business
);