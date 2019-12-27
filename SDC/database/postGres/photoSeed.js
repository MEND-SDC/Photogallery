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

const createPhotoStr = (entries) => {
  let csvString = '';
  let urlId;
  let listingId = 780001;

  for (let i = 1; i <= entries; i++) {
    urlId = Math.floor(Math.random() * (1001 - 1) + 1)

    csvString += `${faker.lorem.sentence()},`;
    csvString += `https://sdcroomphotos.s3-us-west-2.amazonaws.com/photos/photo${urlId}.jpg,`;
    csvString += `800x600,`;
    csvString += `${listingId}`;

    if (i !== entries) {
      csvString += '\n';
    }

    if (i % 10 === 0) {
      listingId++;
    }
  }
  return csvString;
};

const createCSV = (createStr, table, entryCount) => {
  fs.writeFileSync(path.resolve(`${table}.csv`), createStr(entryCount));
};

const seedPostgres = async function(createStr, table, entryCount) {
  for (let i = 1; i <= 22; i++) {
    createCSV(createStr, table, entryCount);
    try {
      await pool.query(`COPY photos(description,url,resolution,listing_id) FROM '${path.resolve(`${table}.csv`)}' DELIMITER ',';`)
      console.log('csv inserted');
      console.log((Date.now() - start) / 1000);
    } catch (err) {
      console.log(err);
    }
  }

  pool.end();
}

seedPostgres(createPhotoStr, 'photos', 1000000);