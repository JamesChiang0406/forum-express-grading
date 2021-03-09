let routes = require('./routes')
let api = require('./api')

module.exports = (app) => {
  app.use('/', routes)
  app.use('/api', api)
}