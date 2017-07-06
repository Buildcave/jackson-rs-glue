import _ from 'lodash';
import express from 'express';
import logger from 'npmlog';
import cors from 'cors';
import bodyParser from 'body-parser';
import RedirectTemplate from './templates/dist/redirect.template';
import MapRequestsToUUID from '../lib/map-requests-to-uuid';
import { logLevel } from '../config';

logger.logLevel = logLevel;

const redirectHost = 'https://github.com';

// Elasticbeanstalk sets port to upstream port
// automatically.
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

app.all('*', (req, res) => {
  MapRequestsToUUID.mapReqByUrl(req)
    .then((uuid) => {
      logger.info(`Got UUID: ${uuid}`);
      const compiled = _.template(RedirectTemplate);
      const response = compiled({ uuid });
      res.send(response);
    })
    .catch((err) => {
      logger.error(err);
      res.redirect(`${redirectHost}${req.path}`);
    });
});

app.listen(port, () => {
  logger.info(`Jackson RS Glue listening on port ${port}!`);
});
