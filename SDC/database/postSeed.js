const faker = require('faker');
const fs = require('fs');
const start = Date.now();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'nickholke',
  host: 'localhost',
  database: 'photogallery',
  port: '5432'
})

const createStr = () => {
  const createRow = () => {
    return `${faker.lorem.words()},${faker.name.firstName()},${faker.address.streetAddress()},${faker.address.city()},${faker.address.stateAbbr()}\n`
  }
  let csvString = 'title,hostname,address,city,state\n';
  let rows = 1000000;

  while (rows > 0) {
    csvString += createRow();
    rows--;
  }
  return csvString
}

async function copyCSV () {
  for (let i = 0; i < 10; i++) {
    fs.writeFileSync('./listings.csv', createStr());
    try {
      await pool.query(`COPY listings(title,hostname,address,city,state) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/listings.csv' DELIMITER ',' CSV HEADER`)
      console.log('csv inserted');
      console.log((Date.now() - start) / 1000);
    } catch (err) {
      console.log(err)
    }
  }

  pool.end();
}

copyCSV();


