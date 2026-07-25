const jwt = require('jsonwebtoken')

const autenticacion = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ')

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado.' })
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    return next()
  } catch (_error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado.' })
  }
}

module.exports = autenticacion
