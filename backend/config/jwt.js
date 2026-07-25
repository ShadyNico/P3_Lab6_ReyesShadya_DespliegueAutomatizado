const jwt = require('jsonwebtoken')

const generarToken = (usuario) => {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET no está configurado.')
  }

  return jwt.sign(
    {
      id: usuario.id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    },
    secret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  )
}

module.exports = generarToken
