const { Pool } = require('pg');

const pool = new Pool({
  user: 'nickholke',
  host: 'localhost',
  database: 'photogallery',
  port: '5432',
});

const getData = (id, res) => {
  pool.query(`SELECT url FROM photos WHERE listing_id=${id} limit 10;`)
    .then((response) => {
      let urls = [];
      const { rows } = response;
      rows.forEach((row) => urls.push(row.url));
      res.send({ urls });
    })
    .catch((err) => res.writeHead(400));
};

const writeData = (id, res) => {
  pool.query(`INSERT INTO photos(description,url,resolution, listing_id) VALUES ()`)
}

module.exports = {
  getData,
};

// const db = require('../db/index');
// module.exports.getData = function getAllDataFromDb(id, res) {
//   db.Listing.find({})
//     .then((data) => {
//       console.log('THIS IS THE DATA INSIDE OF THE DB IN THE CONTAINER', data);
//       res.send(data[id - 1]);
//     });
// };
