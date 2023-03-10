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
      let html ='Bu resim şunları içermektedir; </br></br>';
      labels.forEach(label => html+=`<li>${label.description}</li>`);

      res.send(html);
      //console.log(results);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log('Server running'));
