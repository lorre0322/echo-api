const PORT = process.env.PORT || 4000
const VERSION = require('../package.json').version;
const app = require("fastify")({ bodyLimit: 5242880 });
const cors = require('@fastify/cors');


const static = require("./routes/static")();
const user = require("./routes/user")();
const moment = require("./routes/moment")();
const blog = require("./routes/blog")();
const Router = [...static,...user,...moment,...blog]

app.register(cors, {
  origin: "*",
  methods: ['GET', 'PUT', 'POST','DELETE'],
  allowedHeaders: 'Content-Type',
  credentials:true
})

async function service() {

  Router.forEach((route) => {
    app.route(route);
  });

  await app.listen({ port: PORT, host: "0.0.0.0" }, () => {
    console.log('\x1B[46m%s\x1B[0m', ' ➪ echo api  ', `version ${VERSION}`)
    console.log('\x1B[46m%s\x1B[0m', ` ➪ service runing in PORT ${PORT} `);
  })
}

module.exports = { service }
