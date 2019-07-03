var config = require('../../config')

var errors = require('../../errors')

module.exports = function (router) {
  if (config.NODE_ENV === 'dev') {
    router.get('/debug-sentry', function(req, res, next) {
      next(errors.generateError('ETEST', 'Test of Sentry'))
    })
  }
}
