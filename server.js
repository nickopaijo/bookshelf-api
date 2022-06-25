const hapi = require('@hapi/hapi')
const route = require('./source/configurations/routes')

const init = async () => {
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(route)
  await server.start()
  console.log(`Server run at ${server.info.uri}`)
}
init()
