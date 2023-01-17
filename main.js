const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: './apikey.json'
});

let url = '';


app.get('/resim', function (req, res) {

  url = req.query.url;

  // Performs label detection on the image file
  client
    .labelDetection(url)
    .then(results => {
      const labels = results[0].labelAnnotations;
      let foundedLabels = [];
      labels.forEach(label => foundedLabels.push(label.description));

      res.send(foundedLabels);
      //console.log(results);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

});





app.listen(5000, '127.0.0.1', () => console.log('Server running'));
