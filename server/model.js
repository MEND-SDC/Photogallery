const { Pool } = require('pg');

const pool = new Pool({
  user: 'nickholke',
  host: 'localhost',
  database: 'photogallery',
  port: '5432',
});

const getData = (id, res) => {
  id = Math.floor(Math.random() * (10000001 - 1) + 1);
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
  id = Math.floor(Math.random() * (10000001 - 1) + 1);
  pool.query(`INSERT INTO photos(description,url,resolution,listing_id) VALUES ('testing', 'https://sdcroomphotos.s3-us-west-2.amazonaws.com/photos/photo487.jpg', '800x400', ${id})`)
    .then((response) => {
      res.send('row inserted');
    })
    .catch((err) => res.writeHead(400));
};

const updateData = (id, res) => {
  pool.query(`UPDATE photos SET resolution='200x400' where photo_id=${id};`)
    .then((response) => {
      res.send('photo updated');
    })
    .catch((err) => res.writeHead(400));
};

const deleteData = (id, res) => {
  pool.query(`DELETE from photos WHERE photo_id=${id};`)
    .then((response) => {
      res.send('photo deleted');
    })
    .catch((err) => res.writeHead(400));
};

module.exports = {
  getData,
  writeData,
  updateData,
  deleteData,
};

// const db = require('../db/index');
// module.exports.getData = function getAllDataFromDb(id, res) {
//   db.Listing.find({})
//     .then((data) => {
//       console.log('THIS IS THE DATA INSIDE OF THE DB IN THE CONTAINER', data);
//       res.send(data[id - 1]);
//     });
// };
