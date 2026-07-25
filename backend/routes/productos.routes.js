const express = require('express')
const conexion = require('../database/conexion')
const autenticacion = require('../middlewares/autenticacion')

const router = express.Router()

router.use(autenticacion)

const normalizeProduct = (row) => ({
  id: row.id,
  nombre: row.nombre,
  descripcion: row.descripcion,
  stock: row.stock,
  precio: Number(row.price),
  imagen: row.imagen,
})

const getProductInput = (body) => {
  const producto = {
    nombre: body.nombre?.trim(),
    descripcion: body.descripcion?.trim(),
    precio: Number(body.precio ?? body.price),
    stock: Number(body.stock),
    imagen: body.imagen?.trim() || null,
  }

  const valid =
    producto.nombre &&
    producto.descripcion &&
    Number.isFinite(producto.precio) &&
    producto.precio >= 0 &&
    Number.isInteger(producto.stock) &&
    producto.stock >= 0

  return { producto, valid }
}

router.get('/', async (_req, res, next) => {
  try {
    const resultado = await conexion.query(
      `SELECT id, nombre, descripcion, stock, price, imagen
       FROM productos
       ORDER BY id DESC`,
    )
    return res.status(200).json(resultado.rows.map(normalizeProduct))
  } catch (error) {
    return next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const resultado = await conexion.query(
      `SELECT id, nombre, descripcion, stock, price, imagen
       FROM productos
       WHERE id = $1`,
      [req.params.id],
    )

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' })
    }
    return res.status(200).json(normalizeProduct(resultado.rows[0]))
  } catch (error) {
    return next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { producto, valid } = getProductInput(req.body)

  if (!valid) {
    return res.status(400).json({
      mensaje: 'Nombre, descripción, precio y stock válidos son requeridos.',
    })
  }

  try {
    const resultado = await conexion.query(
      `INSERT INTO productos (nombre, descripcion, stock, price, imagen)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, nombre, descripcion, stock, price, imagen`,
      [
        producto.nombre,
        producto.descripcion,
        producto.stock,
        producto.precio,
        producto.imagen,
      ],
    )
    return res.status(201).json(normalizeProduct(resultado.rows[0]))
  } catch (error) {
    return next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  const { producto, valid } = getProductInput(req.body)

  if (!valid) {
    return res.status(400).json({
      mensaje: 'Nombre, descripción, precio y stock válidos son requeridos.',
    })
  }

  try {
    const resultado = await conexion.query(
      `UPDATE productos
       SET nombre = $1, descripcion = $2, stock = $3, price = $4, imagen = $5
       WHERE id = $6
       RETURNING id, nombre, descripcion, stock, price, imagen`,
      [
        producto.nombre,
        producto.descripcion,
        producto.stock,
        producto.precio,
        producto.imagen,
        req.params.id,
      ],
    )

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' })
    }
    return res.status(200).json(normalizeProduct(resultado.rows[0]))
  } catch (error) {
    return next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const resultado = await conexion.query(
      `DELETE FROM productos
       WHERE id = $1
       RETURNING id, nombre, descripcion, stock, price, imagen`,
      [req.params.id],
    )

    if (resultado.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado.' })
    }
    return res.status(200).json({
      mensaje: 'Producto eliminado correctamente.',
      producto: normalizeProduct(resultado.rows[0]),
    })
  } catch (error) {
    return next(error)
  }
})

module.exports = router
