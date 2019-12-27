const path = require('path');
const start = Date.now();
const fs = require('fs');
const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'nickholke',
  host: 'localhost',
  database: 'photogallery',
  port: '5432'
})

const createLikedStr = (entries) => {
  let csvString = '';
  let userId;
  let photoId = 1500000;

  for (let i = 1; i <= entries; i++) {
    userId = Math.floor(Math.random() * (10000001 - 1000000) + 1000000)
    csvString += `${photoId},`;
    csvString += `${userId}`;

    if (i !== entries) {
      csvString += '\n';
    }

    if (i % 5 === 0) {
      photoId++;
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
  for (let i = 1; i <= 50; i++) {
    createCSV(createStr, table, entryCount);
    try {
      await pool.query(`COPY liked_photos(photo_id,user_id) FROM '${path.resolve(`${table}.csv`)}' DELIMITER ',';`)
      console.log('csv inserted');
      console.log((Date.now() - start) / 1000);
    } catch (err) {
      console.log(err);
    }
  }

  pool.end();
}

seedPostgres(createLikedStr, 'liked', 1000000);