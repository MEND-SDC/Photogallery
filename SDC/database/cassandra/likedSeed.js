const path = require('path');
const begin = Date.now();
const fs = require('fs');

const createLikedStr = (start, end, photoId) => {
  let csvString = '';
  let userId;

  for (let i = start; i <= end; i++) {
    userId = Math.floor(Math.random() * (10000001 - 1) + 1)
    csvString += `${photoId},`;
    csvString += `${userId}`;

    if (i !== end) {
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

const createCSV = (createStr, table, start, end, photoId) => {
  fs.writeFile(path.resolve(`${table}.csv`), createStr(start,end,photoId), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('csv written');
    }
  });
  console.log((Date.now() - begin) / 1000);
}

createCSV(createLikedStr, 'liked_photos', 49000001, 50000000, 9800001);

//COPY photogallery.liked_photos(photo_id, user_id) FROM '/Users/nickholke/Desktop/HackReactor/SDC/airbnb-photogallery/SDC/database/cassandra/liked_photos.csv' WITH DELIMITER=',';