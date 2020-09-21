const fs = require('fs');
const express = require('express');
const router = express.Router();
const handlebars = require('handlebars');

const { mailTemplatesFolder } = require('../config');


router.get('/', (req, res, next) => {
  res.send('Templates api works!');
});

//* Get all possible template names
router.get('/getAll', (req, res, next) => {
  // Scan 'mailTemplates' folder for files
  fs.readdir('./views/mailTemplates', (err, dir) =>
    res.send(dir.map(one => one.replace(/\.js$/, '')))
  );
});

//* Get not rendered template
router.get('/rawTemplate/:templateName', (req, res, next) => {
  const { template } = require(`${mailTemplatesFolder}/${req.params.templateName}`);
  res.send(template);
});

//* Get documentation for the template
router.get('/templateDoc/:templateName', (req, res, next) => {
  const { doc } = require(`${mailTemplatesFolder}/${req.params.templateName}`);
  res.send(doc);
});

//* Get rendered template
router.post('/renderTemplate/:templateName', (req, res, next) => {
  const { template } = require(`${mailTemplatesFolder}/${req.params.templateName}`);

  const params = req.body;

  res.send(handlebars.compile(template)(params));
});


module.exports = router;
