const faker = require('faker');
const fs = require('fs');
const path = require('path');
const start = Date.now();

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'nickholke',
  host: 'localhost',
  database: 'photogallery',
  port: '5432'
})

const createListingStr = (entryCount) => {
  let csvString = '';

  for (let i = 1; i <= entryCount; i++) {
    csvString += `${faker.lorem.words()},`;
    csvString += `${faker.name.firstName()},`;
    csvString += `${faker.address.streetAddress()},`;
    csvString += `${faker.address.city()},`;
    csvString += `${faker.address.stateAbbr()}`;
    if (i !== entryCount) {
      csvString += '\n';
    }
  }
  return csvString;
};

const createCSV = (createStr, table, entryCount) => {
  fs.writeFileSync(path.resolve(`${table}.csv`), createStr(entryCount));
};

const seedPostgres = async function(createStr, table, entryCount) {
  for (let i = 0; i < 10; i++) {
    createCSV(createStr, table, entryCount);
    try {
      await pool.query(`COPY listings(title,hostname,address,city,state) FROM '${path.resolve(`${table}.csv`)}' DELIMITER ',';`)
      console.log('csv inserted');
      console.log((Date.now() - start) / 1000);
    } catch (err) {
      console.log(err);
    }
  }

  pool.end();
}

seedPostgres(createListingStr, 'listings', 1000000);

module.exports = {
  createListingStr,
  createCSV
}



