import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import EmailIcon from '@mui/icons-material/Email'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { registro } from '../../services/authservices'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#edf7f6',
    backgroundColor: 'rgba(7, 24, 33, 0.75)',
    '& fieldset': { borderColor: 'rgba(139, 233, 253, 0.4)' },
    '&:hover fieldset': { borderColor: '#8be9fd' },
    '&.Mui-focused fieldset': { borderColor: '#8be9fd' },
  },
  '& .MuiInputLabel-root': { color: '#b9d6d0' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#8be9fd' },
  '& .MuiFormHelperText-root': { color: '#ffb4ab' },
}

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target }) => {
    setFormData((previous) => ({ ...previous, [target.name]: target.value }))
    setErrors((previous) => ({ ...previous, [target.name]: '', general: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = {}

    if (formData.nombre.trim().length < 2) {
      validationErrors.nombre = 'El nombre debe tener al menos 2 caracteres.'
    }
    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      validationErrors.correo = 'Ingresa un correo válido.'
    }
    if (formData.password.length < 6) {
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Las contraseñas no coinciden.'
    }
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      await registro(formData.nombre.trim(), formData.correo.trim(), formData.password)
      navigate('/login', { replace: true, state: { registered: true } })
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.mensaje ||
          'No se pudo completar el registro. Inténtalo nuevamente.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="auth-page">
      <Card className="auth-card auth-card-wide">
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box className="auth-icon auth-icon-cyan" aria-hidden="true">
            <HowToRegIcon />
          </Box>
          <Typography component="h1" variant="h4" className="auth-title">
            Crear cuenta
          </Typography>
          <Typography className="auth-subtitle">
            Regístrate para gestionar productos de forma segura.
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              required
              autoComplete="name"
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={Boolean(errors.nombre)}
              helperText={errors.nombre}
              sx={{ ...inputSx, mb: 2 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#8be9fd' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              autoComplete="email"
              label="Correo"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              error={Boolean(errors.correo)}
              helperText={errors.correo}
              sx={{ ...inputSx, mb: 2 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#8be9fd' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              autoComplete="new-password"
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ ...inputSx, mb: 2 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#8be9fd' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        onClick={() => setShowPassword((visible) => !visible)}
                        edge="end"
                        sx={{ color: '#b9d6d0' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              autoComplete="new-password"
              label="Confirmar contraseña"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              sx={{ ...inputSx, mb: 3 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#8be9fd' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              size="large"
              className="portal-action portal-action-cyan"
            >
              {loading ? 'Registrando…' : 'Registrarse'}
            </Button>
          </Box>

          <Typography className="auth-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </Typography>
          <Typography className="auth-link">
            <Link to="/">Volver al inicio</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
