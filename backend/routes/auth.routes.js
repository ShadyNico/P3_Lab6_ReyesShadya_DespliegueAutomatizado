const express = require('express')
const bcrypt = require('bcrypt')
const conexion = require('../database/conexion')
const generarToken = require('../config/jwt')

const router = express.Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post(['/register', '/registro'], async (req, res, next) => {
  try {
    const nombre = req.body.nombre?.trim()
    const correo = req.body.correo?.trim().toLowerCase()
    const password = req.body.password

    if (!nombre || !correo || !password) {
      return res.status(400).json({
        mensaje: 'Nombre, correo y contraseña son requeridos.',
      })
    }
    if (nombre.length < 2 || !emailPattern.test(correo) || password.length < 6) {
      return res.status(400).json({
        mensaje: 'Revisa el nombre, correo y longitud de la contraseña.',
      })
    }

    const usuarioExistente = await conexion.query(
      'SELECT id FROM usuarios WHERE LOWER(correo) = $1',
      [correo],
    )

    if (usuarioExistente.rowCount > 0) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado.' })
    }

    const passwordEncriptada = await bcrypt.hash(password, 10)
    const resultado = await conexion.query(
      `INSERT INTO usuarios (nombre, correo, password, id_rol)
       VALUES ($1, $2, $3, (SELECT id FROM roles WHERE nombre = 'CLIENTE'))
       RETURNING id, nombre, correo, id_rol`,
      [nombre, correo, passwordEncriptada],
    )

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente.',
      usuario: { ...resultado.rows[0], rol: 'CLIENTE' },
    })
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ mensaje: 'El correo ya está registrado.' })
    }
    return next(error)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const correo = req.body.correo?.trim().toLowerCase()
    const password = req.body.password

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: 'Correo y contraseña son requeridos.',
      })
    }

    const resultado = await conexion.query(
      `SELECT
         u.id,
         u.nombre,
         u.correo,
         u.password,
         u.id_rol,
         r.nombre AS rol
       FROM usuarios u
       INNER JOIN roles r ON u.id_rol = r.id
       WHERE LOWER(u.correo) = $1`,
      [correo],
    )

    if (resultado.rowCount === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' })
    }

    const usuario = resultado.rows[0]
    const passwordCorrecta = await bcrypt.compare(password, usuario.password)

    if (!passwordCorrecta) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas.' })
    }

    const token = generarToken(usuario)
    delete usuario.password

    return res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      token,
      usuario,
    })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
