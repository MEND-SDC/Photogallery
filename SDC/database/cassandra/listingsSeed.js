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

    if (i % 100000 === 0) {
      console.log(i)
    }
  }
  return csvString;
};

const createCSV = (createStr, table, start, end) => {
  fs.writeFile(path.resolve(`${table}.csv`), createStr(start,end), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('csv written');
    }
  });
  console.log((Date.now() - begin) / 1000);
}

createCSV(createListingStrCass, 'listings1', 9000001, 10000000)

//SOURCE '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/schema.cql'
//COPY photogallery.listings(listing_id,title,hostname,address,city,state) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/listings.csv' WITH DELIMITER=',';
//nodetool tablestats photogallery.listings












