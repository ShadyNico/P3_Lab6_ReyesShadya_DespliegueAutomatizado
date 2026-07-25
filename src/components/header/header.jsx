import { NavLink, useNavigate } from 'react-router-dom'
import styles from './header.module.css'

const navClassName = ({ isActive }) =>
  `${styles.item_menu} ${isActive ? styles.active : ''}`

export const Header = () => {
  const navigate = useNavigate()
  const authenticated = Boolean(localStorage.getItem('token'))

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login', { replace: true })
  }

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand} aria-label="Ir al inicio">
        <span className={styles.brand_mark}>PWA</span>
        <span>
          <strong>Portal Interdimensional</strong>
          <small>Componentes Web</small>
        </span>
      </NavLink>
      <nav className={styles.nav} aria-label="Navegación principal">
        <NavLink to="/" end className={navClassName}>
          Inicio
        </NavLink>
        <NavLink to="/personajes" className={navClassName}>
          Personajes
        </NavLink>
        <NavLink to="/nosotros" className={navClassName}>
          Nosotros
        </NavLink>
        <NavLink to="/contactos" className={navClassName}>
          Contacto
        </NavLink>
        {authenticated ? (
          <>
            <NavLink to="/productos" className={navClassName}>
              Productos
            </NavLink>
            <button type="button" className={styles.logout} onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={navClassName}>
              Ingresar
            </NavLink>
            <NavLink to="/registro" className={styles.register}>
              Registrarse
            </NavLink>
          </>
        )}
      </nav>
    </header>
  )
}
