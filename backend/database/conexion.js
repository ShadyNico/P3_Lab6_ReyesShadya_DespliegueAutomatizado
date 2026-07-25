const { Pool } = require('pg')
require('dotenv').config()

const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }
  : {
      user: process.env.DB_USER || 'portal_user',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_DATABASE || 'portal_db',
      password: process.env.DB_PASSWORD || 'portal_password',
      port: Number(process.env.DB_PORT) || 5432,
    }

const conexion = new Pool(connectionConfig)

conexion.on('error', (error) => {
  console.error('Error inesperado en el pool de PostgreSQL:', error.message)
})

module.exports = conexion
