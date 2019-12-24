const fs = require('fs');
const path = require('path');
const begin = Date.now();

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

module.exports = { createCSV };