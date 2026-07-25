require('dotenv').config()
const app = require('./app')

const port = Number(process.env.PORT) || 3000

const server = app.listen(port, () => {
  console.log(`API REST disponible en http://localhost:${port}`)
})

const closeGracefully = (signal) => {
  console.log(`${signal} recibido. Cerrando el servidor...`)
  server.close(() => process.exit(0))
}

process.on('SIGTERM', () => closeGracefully('SIGTERM'))
process.on('SIGINT', () => closeGracefully('SIGINT'))
