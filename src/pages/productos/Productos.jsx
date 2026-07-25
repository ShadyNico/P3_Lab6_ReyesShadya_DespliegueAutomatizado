import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditIcon from '@mui/icons-material/Edit'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductos,
} from '../../services/productos'

const emptyForm = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  imagen: '',
}

const getErrorMessage = (error) =>
  error.response?.data?.mensaje || 'Error al procesar la solicitud.'

export const Productos = () => {
  const navigate = useNavigate()
  const formRef = useRef(null)
  const [productos, setProductos] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const handleApiError = useCallback(
    (error) => {
      if (error.response?.status === 401) {
        navigate('/login', { replace: true })
        return
      }
      setMessage({ type: 'error', text: getErrorMessage(error) })
    },
    [navigate],
  )

  const cargarProductos = useCallback(async () => {
    setLoading(true)
    try {
      const data = await obtenerProductos()
      setProductos(Array.isArray(data) ? data : [])
    } catch (error) {
      handleApiError(error)
    } finally {
      setLoading(false)
    }
  }, [handleApiError])

  useEffect(() => {
    let active = true

    obtenerProductos()
      .then((data) => {
        if (active) setProductos(Array.isArray(data) ? data : [])
      })
      .catch((error) => {
        if (active) handleApiError(error)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [handleApiError])

  const handleChange = ({ target }) => {
    setFormData((previous) => ({ ...previous, [target.name]: target.value }))
  }

  const resetForm = () => {
    setFormData(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)

    const payload = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
      precio: Number(formData.precio),
      stock: Number(formData.stock),
      imagen: formData.imagen.trim(),
    }

    try {
      if (editingId) {
        await actualizarProducto(editingId, payload)
        setMessage({ type: 'success', text: 'Producto actualizado correctamente.' })
      } else {
        await crearProducto(payload)
        setMessage({ type: 'success', text: 'Producto registrado correctamente.' })
      }
      resetForm()
      await cargarProductos()
    } catch (error) {
      handleApiError(error)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (producto) => {
    setEditingId(producto.id)
    setFormData({
      nombre: producto.nombre ?? '',
      descripcion: producto.descripcion ?? '',
      precio: producto.precio ?? producto.price ?? '',
      stock: producto.stock ?? '',
      imagen: producto.imagen ?? '',
    })
    setMessage(null)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleDelete = async (producto) => {
    const confirmed = window.confirm(
      `¿Deseas eliminar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`,
    )
    if (!confirmed) return

    setMessage(null)
    try {
      await eliminarProducto(producto.id)
      setMessage({ type: 'success', text: 'Producto eliminado correctamente.' })
      if (editingId === producto.id) resetForm()
      await cargarProductos()
    } catch (error) {
      handleApiError(error)
    }
  }

  return (
    <section className="products-page">
      <header className="products-hero">
        <Box>
          <Typography className="eyebrow">Módulo protegido con JWT</Typography>
          <Typography component="h1" variant="h3">
            Gestión de productos
          </Typography>
          <Typography>
            Consulta, registra, actualiza y elimina productos desde la API REST.
          </Typography>
        </Box>
        <Button
          type="button"
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={cargarProductos}
          disabled={loading}
        >
          Actualizar lista
        </Button>
      </header>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)}>
          {message.text}
        </Alert>
      )}

      <Box ref={formRef} component="form" className="product-form" onSubmit={handleSubmit}>
        <Box className="product-form-heading">
          {editingId ? <EditIcon /> : <AddBoxIcon />}
          <Box>
            <Typography component="h2" variant="h5">
              {editingId ? 'Editar producto' : 'Registrar producto'}
            </Typography>
            <Typography>
              Todos los campos excepto la imagen son obligatorios.
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              required
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              inputProps={{ maxLength: 120 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="URL de la imagen"
              name="imagen"
              type="url"
              value={formData.imagen}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              required
              fullWidth
              multiline
              minRows={2}
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="Precio"
              name="precio"
              type="number"
              value={formData.precio}
              onChange={handleChange}
              slotProps={{ htmlInput: { min: 0, step: '0.01' } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              required
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              slotProps={{ htmlInput: { min: 0, step: 1 } }}
            />
          </Grid>
        </Grid>

        <Box className="product-form-actions">
          {editingId && (
            <Button type="button" variant="text" onClick={resetForm}>
              Cancelar edición
            </Button>
          )}
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? 'Guardando…' : editingId ? 'Actualizar' : 'Guardar'}
          </Button>
        </Box>
      </Box>

      <Box className="products-section-heading">
        <Box>
          <Typography component="h2" variant="h5">
            Productos registrados
          </Typography>
          <Typography>
            {productos.length} {productos.length === 1 ? 'registro' : 'registros'}
          </Typography>
        </Box>
      </Box>

      {loading ? (
        <Box className="products-state" aria-live="polite">
          <CircularProgress color="inherit" />
          <Typography>Cargando productos…</Typography>
        </Box>
      ) : productos.length === 0 ? (
        <Box className="products-state">
          <Inventory2OutlinedIcon sx={{ fontSize: 54 }} />
          <Typography component="h3" variant="h6">
            Aún no hay productos
          </Typography>
          <Typography>Usa el formulario para crear el primer registro.</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {productos.map((producto) => (
            <Grid key={producto.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card className="product-card">
                {producto.imagen ? (
                  <CardMedia
                    component="img"
                    height="190"
                    image={producto.imagen}
                    alt={`Imagen de ${producto.nombre}`}
                  />
                ) : (
                  <Box className="product-placeholder" aria-hidden="true">
                    <Inventory2OutlinedIcon />
                  </Box>
                )}
                <CardContent>
                  <Typography component="h3" variant="h6">
                    {producto.nombre}
                  </Typography>
                  <Typography className="product-description">
                    {producto.descripcion}
                  </Typography>
                  <Box className="product-meta">
                    <Typography>
                      ${Number(producto.precio ?? producto.price).toFixed(2)}
                    </Typography>
                    <Typography>Stock: {producto.stock}</Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    type="button"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(producto)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    color="error"
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={() => handleDelete(producto)}
                  >
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </section>
  )
}
