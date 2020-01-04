require('newrelic');
const express = require('express');
const app = express();
const path = require('path');
const model = require('./model.js');
const cors = require('cors');
const { getData, writeData, updateData, deleteData } = require('./model.js');

app.use(cors());

const port = 3004;

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/:id', express.static(path.join(__dirname, '../public')));
app.use('/bundle.js', express.static(path.join(__dirname, '../public/bundle.js')));

// app.get('/airbnb/listings/:id', (req, res) => {
//   model.getData(req.params.id, res);
// });

app.get('/api/photos/:id', (req, res) => {
  getData(req.params.id, res);
});

app.post('/api/photos/:id', (req, res) => {
  writeData(req.params.id, res);
});

app.patch('/api/photos/:id', (req, res) => {
  updateData(req.params.id, res);
});

app.delete('/api/photos/:id', (req, res) => {
  deleteData(req.params.id, res);
});

app.listen(port, () => {
  console.log(`listening at port !!! ${port}`);
});
