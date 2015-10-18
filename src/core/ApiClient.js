import superagent from 'superagent';


/*
  modified from: https://raw.githubusercontent.com/erikras/react-redux-universal-hot-example/master/src/helpers/ApiClient.js
*/

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
  constructor(req) {
    ['get', 'post', 'put', 'patch', 'del'].
      forEach((method) => {
        this[method] = (path, options) => {
          return new Promise((resolve, reject) => {
            const request = superagent[method](this.formatUrl(req, path));
            if (options && options.params) {
              request.query(options.params);
            }
            if (req) {
              if (req.get('cookie')) {
                request.set('cookie', req.get('cookie'));
              }
            }
            if (options && options.data) {
              request.send(options.data);
            }
            request.end((err, res) => {
              if (err) {
                reject((res && res.body) || err);
              } else {
                resolve(res.body);
              }
            });
          });
        };
      });
  }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(req, path) {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    if (req) {
      // Prepend host and port of the API server to the path.
      return 'http://localhost:' + req.app.settings.port + adjustedPath;
    }
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
  }
}
const ApiClient = ApiClient_;

export default ApiClient;
