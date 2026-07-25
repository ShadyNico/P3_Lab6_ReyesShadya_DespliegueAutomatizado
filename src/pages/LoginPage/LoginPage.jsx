import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
import LockIcon from '@mui/icons-material/Lock'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { login } from '../../services/authservices'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: '#edf7f6',
    backgroundColor: 'rgba(7, 24, 33, 0.75)',
    '& fieldset': { borderColor: 'rgba(114, 245, 66, 0.4)' },
    '&:hover fieldset': { borderColor: '#72f542' },
    '&.Mui-focused fieldset': { borderColor: '#72f542' },
  },
  '& .MuiInputLabel-root': { color: '#b9d6d0' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#72f542' },
  '& .MuiFormHelperText-root': { color: '#ffb4ab' },
}

export const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ correo: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target }) => {
    setFormData((previous) => ({ ...previous, [target.name]: target.value }))
    setErrors((previous) => ({ ...previous, [target.name]: '', general: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = {}

    if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      validationErrors.correo = 'Ingresa un correo válido.'
    }
    if (formData.password.length < 6) {
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.'
    }
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      const data = await login(formData.correo, formData.password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      navigate(location.state?.from || '/productos', { replace: true })
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.mensaje ||
          'No se pudo iniciar sesión. Verifica tus credenciales y la conexión.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className="auth-page">
      <Card className="auth-card">
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Box className="auth-icon" aria-hidden="true">
            <RocketLaunchIcon />
          </Box>
          <Typography component="h1" variant="h4" className="auth-title">
            Iniciar sesión
          </Typography>
          <Typography className="auth-subtitle">
            Accede al inventario protegido del portal.
          </Typography>

          {location.state?.registered && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Usuario registrado correctamente. Ya puedes iniciar sesión.
            </Alert>
          )}
          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
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
              sx={{ ...inputSx, mb: 2.5 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#72f542' }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              fullWidth
              required
              autoComplete="current-password"
              label="Contraseña"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ ...inputSx, mb: 3 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: '#72f542' }} />
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
            <Button
              type="submit"
              disabled={loading}
              fullWidth
              variant="contained"
              size="large"
              className="portal-action"
            >
              {loading ? 'Ingresando…' : 'Iniciar sesión'}
            </Button>
          </Box>

          <Typography className="auth-link">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </Typography>
          <Typography className="auth-link">
            <Link to="/">Volver al inicio</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
