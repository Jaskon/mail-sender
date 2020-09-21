const secrets = require('./secretConfig');

const mailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,  // For ssl
  user: secrets.mailUser,
  pass: secrets.mailPass
};

const mailTemplatesFolder = '../views/mailTemplates';

module.exports = { mailConfig, mailTemplatesFolder };
