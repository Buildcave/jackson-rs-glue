import _ from 'lodash';
import express from 'express';
import RedirectTemplate from './templates/dist/redirect.template';

const app = express();

app.get('/', (req, res) => {
  // TODO: get the uuid from the request and pass it into the template
  const compiled = _.template(RedirectTemplate);
  const response = compiled({ test: 'TEST TEMPLATE VALUEEE' });
  res.send(response);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
