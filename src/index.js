import _ from 'lodash';
import express from 'express';
import RedirectTemplate from './templates/dist/redirect.template';

// Elasticbeanstalk sets port to upstream port
// automatically.
const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  // TODO: get the uuid from the request and pass it into the template
  const compiled = _.template(RedirectTemplate);
  const response = compiled({ test: 'TEST TEMPLATE VALUEEE' });
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
