import _ from 'lodash';

class MapPathToUUID {
  static getMapFunctionFromRequestMethodAndPath({ method, path }) {
    return new Promise((resolve) => {
      const mappings = {
        '/jquery': {
          POST: (req) => {
            const requestBody = req.body;
            if (!requestBody.version) {
              throw new Error('Invalid Input, request JSON body must include a version key');
            }
            const uuid = requestBody.version;
            return uuid;
          },
        },
        '/jquery/dist': {
          POST: (req) => {
            const requestBody = req.body;
            if (!requestBody.version) {
              throw new Error('Invalid Input, request JSON body must include a version key');
            }
            const uuid = requestBody.version;
            return uuid;
          },
          GET: (req) => {
            const requestHeaders = req.headers;
            const xAltReferer = requestHeaders['X-Alt-Referer'] || requestHeaders['x-alt-referer'];
            if (!xAltReferer) {
              throw new Error('Invalid Input, request must include a X-Alt-Referer header');
            }
            const getUUID = () => {
              const index = xAltReferer.lastIndexOf('?txid=');
              return xAltReferer.substring(index + 6);
            };
            const uuid = getUUID();
            return uuid;
          },
        },
        '/jquery/stable': {
          POST: (req) => {
            const requestBody = req.body;
            if (!requestBody.version) {
              throw new Error('Invalid Input, request JSON body must include a version key');
            }
            const uuid = requestBody.version;
            return uuid;
          },
        },
        '/jquery/latest': {
          POST: (req) => {
            const requestBody = req.body;
            if (!requestBody.version) {
              throw new Error('Invalid Input, request JSON body must include a version key');
            }
            const uuid = requestBody.version;
            return uuid;
          },
        },
      };

      const mappedPath = mappings[path];
      if (_.isUndefined(mappedPath)) {
        throw new Error('Request does not have a function mapped for this path');
      }

      const mapFunction = mappedPath[method];
      if (_.isUndefined(mapFunction)) {
        throw new Error('Request does not have a method mapped for this path');
      }

      resolve(mapFunction);
    });
  }
}

export default MapPathToUUID;
