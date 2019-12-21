const cassandra = require('cassandra-driver');
const path = require('path');
const begin = Date.now();
const fs = require('fs');
const faker = require('faker');

const createListingStrCass = (start, end) => {
  let csvString = '';

  for (let i = start; i <= end; i++) {
    csvString += `${i},`;
    csvString += `${faker.lorem.words()},`;
    csvString += `${faker.name.firstName()},`;
    csvString += `${faker.address.streetAddress()},`;
    csvString += `${faker.address.city()},`;
    csvString += `${faker.address.stateAbbr()}`;
    if (i !== end) {
      csvString += '\n';
    }
  }
  return csvString;
};

const createCSV = (createStr, table, start, end) => {
  fs.writeFileSync(path.resolve(`${table}.csv`), createStr(start,end));
  console.log((Date.now() - begin) / 1000);
}

createCSV(createListingStrCass, 'listings', 1, 1000000);

//COPY photogallery.listings(listing_id,title,hostname,address,city,state) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/listings.csv' WITH DELIMITER=',';



// const authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');

// const client = new cassandra.Client({
//   contactPoints: ['localhost'],
//   localDataCenter: 'datacenter1',
//   authProvider,
//   keyspace: 'photogallery'
// });

// client.connect()
//   .then(() => console.log('connected'))
//   .catch((err) => console.log('Connection error: ', err));

// const seedCassandra = async function(createStr, table, entryCount) {
//   for (let i = 0; i < 10; i++) {
//     createCSV(createStr, table, entryCount);
//     try {
//       await pool.query(`COPY listings(title,hostname,address,city,state) FROM '${path.resolve(`${table}.csv`)}' DELIMITER ',';`)
//       console.log('csv inserted');
//       console.log((Date.now() - start) / 1000);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   pool.end();
// }

// client.execute(`COPY photogallery.listings(listing_id,title,hostname,address,city,state) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/listings.csv' WITH DELIMITER=',';`, (err,result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('csv copied');
//   }
//   client.shutdown()
//   .then(() => console.log('disconnected'))
// })










