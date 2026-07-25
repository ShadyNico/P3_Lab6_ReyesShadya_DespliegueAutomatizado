const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const productosRoutes = require('./routes/productos.routes')
const conexion = require('./database/conexion')

const app = express()
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
  : true

app.disable('x-powered-by')
app.use(
  cors({
    origin: allowedOrigins,
  }),
)
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.status(200).json({
    estado: 'ok',
    servicio: 'portal-pwa-backend',
  })
})

app.get('/health/db', async (_req, res) => {
  try {
    await conexion.query('SELECT 1')
    res.status(200).json({ estado: 'ok', baseDeDatos: 'conectada' })
  } catch (error) {
    console.error('Error de conexión con PostgreSQL:', error.message)
    res.status(503).json({ estado: 'error', baseDeDatos: 'no disponible' })
  }
})

app.use('/auth', authRoutes)
app.use('/productos', productosRoutes)

app.use((_req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada.' })
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ mensaje: 'Error interno del servidor.' })
})

module.exports = app
