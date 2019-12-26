const fs = require('fs');
const path = require('path');
const faker = require('faker');

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

const createListingStrCass = (start, end) => {
  let csvString = '';

  for (let i = start; i <= end; i++) {
    csvString += `${i},`;
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

module.exports = {
  createCSV,
  createListingStr,
  createListingStrCass
}