const path = require('path');
const start = Date.now();
const fs = require('fs');
const faker = require('faker');

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'nickholke',
  host: 'localhost',
  database: 'photogallery',
  port: '5432'
})

const createUserStr = (entries) => {
  let csvString = '';

  for (let i = 1; i <= entries; i++) {

    csvString += `${faker.name.firstName()},`;
    csvString += `${faker.name.lastName()},`;
    csvString += `${faker.internet.userName()}`;

    if (i !== entries) {
      csvString += '\n';
    }

    if (i % 100000 === 0) {
      console.log(i)
    }
  }
  return csvString;
};

const createCSV = (createStr, table, entryCount) => {
  fs.writeFileSync(path.resolve(`${table}.csv`), createStr(entryCount));
};

const seedPostgres = async function(createStr, table, entryCount) {
  for (let i = 1; i <= 10; i++) {
    createCSV(createStr, table, entryCount);
    try {
      await pool.query(`COPY users(first_name,last_name,username) FROM '${path.resolve(`${table}.csv`)}' DELIMITER ',';`)
      console.log('csv inserted');
      console.log((Date.now() - start) / 1000);
    } catch (err) {
      console.log(err);
    }
  }

  pool.end();
}

seedPostgres(createUserStr, 'users', 1000000);