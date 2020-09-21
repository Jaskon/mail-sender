const template = `
    <div>{{title}}</div>
`;

const exampleConfig = {
  title: 'Hello world!'
};

const doc = `
  Template for common IBM mails.
  
  ${JSON.stringify(exampleConfig, null, 2)}
`;

module.exports = {
  template,
  exampleConfig,
  doc
};
