import _ from 'lodash';
import express from 'express';
import RedirectTemplate from './templates/dist/redirect.template';
// import MapRequestsToUUID from '../lib/map-requests-to-uuid';

const app = express();
// const redirectHost = 'https://github.com';

// Elasticbeanstalk sets port to upstream port
// automatically.
const port = process.env.PORT || 3000;


app.get('*', (req, res) => {
  // console.log(`HEfY TREV: ${redirectHost}${req.path}`);
  // TODO: get the uuid from the request and pass it into the template
  // MapRequestsToUUID.mapReqByUrl(req)
  //   .then(() => {
  const compiled = _.template(RedirectTemplate);
  const response = compiled({ test: 'TESTs123 TEMPLATE VALUEEE' });
  res.send(response);
    // })
    // .catch(() => {
    //   // TODO: forward to same url but with github.com host
    //   res.redirect(`${redirectHost}${req.path}`);
    // });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
