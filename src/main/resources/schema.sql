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