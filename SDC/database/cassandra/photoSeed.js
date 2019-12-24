const path = require('path');
const begin = Date.now();
const fs = require('fs');
const faker = require('faker');

const createPhotoStr = (start, end, listingId) => {
  let csvString = '';
  let urlId;

  for (let i = start; i <= end; i++) {
    urlId = Math.floor(Math.random() * (1001 - 1) + 1)

    csvString += `${listingId},`;
    csvString += `${i},`;
    csvString += `${faker.lorem.sentence()},`;
    csvString += `https://sdcroomphotos.s3-us-west-2.amazonaws.com/photos/photo${urlId}.jpg,`;
    csvString += `800x600`;
    if (i !== end) {
      csvString += '\n';
    }

    if (i % 10 === 0) {
      listingId++;
    }

    if (i % 100000 === 0) {
      console.log(i)
    }
  }
  return csvString;
};

const createCSV = (createStr, table, start, end, listingId) => {
  fs.writeFile(path.resolve(`${table}.csv`), createStr(start,end, listingId), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('csv written');
    }
  });
  console.log((Date.now() - begin) / 1000);
}


createCSV(createPhotoStr, 'photos', 1, 1000000, 1) //100001

//COPY photogallery.photos(listing_id,photo_id,description,url,resolution) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/cassandra/photos.csv' WITH DELIMITER=',';