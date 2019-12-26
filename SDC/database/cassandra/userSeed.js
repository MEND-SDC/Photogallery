const faker = require('faker');
const {createCSV } = require('./seedHelpers');

const createUserStr = (start, end) => {
  let csvString = '';

  for (let i = start; i <= end; i++) {

    csvString += `${i},`;
    csvString += `${faker.name.firstName()},`;
    csvString += `${faker.name.lastName()},`;
    csvString += `${faker.internet.userName()}`;

    if (i !== end) {
      csvString += '\n';
    }

    if (i % 100000 === 0) {
      console.log(i)
    }
  }
  return csvString;
};

createCSV(createUserStr, 'users', 9000001, 10000000);

// COPY photogallery.users(user_id,first_name,last_name,username) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/cassandra/users.csv' WITH DELIMITER=',';