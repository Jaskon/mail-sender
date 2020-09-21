const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
// Mail config
const { mailConfig: { host, port, secure, user, pass }, mailTemplatesFolder } = require('../config');


router.get('/', (req, res, next) => {
  res.send('Mail api works!');
});

router.post('/send', async (req, res, next) => {
  const to = req.body.to;
  const from = req.body.from || '0';
  const subject = req.body.subject;
  const content = req.body.content;
  let html = req.body.html;
  const templateName = !html ? req.body.templateName : undefined;
  const params = req.body.templateParams;

  if (templateName !== undefined) {
    const { template } = require(`${mailTemplatesFolder}/${templateName}`);
    html = handlebars.compile(template)(params);
  }

  let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      pass: pass,
      user: user
    }
  });

  let info = await transporter.sendMail({
    text: content,
    from,
    to,
    subject,
    html
  });

  console.log('Message sent:', info);
  res.send('Succeed!');
});


module.exports = router;
