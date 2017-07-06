import logger from 'npmlog';
import { logLevel } from '../../config';
import MapPathToUUID from './lib/map-path-to-uuid';

logger.logLevel = logLevel;

class MapRequestsToUUID {
  static mapReqByUrl(req) {
    return new Promise((resolve, reject) => {
      const { path, method } = req;

      MapPathToUUID.getMapFunctionFromRequestMethodAndPath({ path, method })
        .then((getUUIDFromPath) => {
          logger.silly('MapRequestsToUUID: got UUID from path function');
          resolve(getUUIDFromPath(req));
        })
        .catch(err => reject(err));
    });
  }
}

export default MapRequestsToUUID;
