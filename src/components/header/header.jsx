import styles from "./header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className={styles.header}>
            <h2 className={styles.logo}>Programaci&oacute;n integrativa de componentes web</h2>
            <nav className={styles.nav}>
                <Link to="/" className={styles.item_menu}>Inicio</Link>
                <Link to="/nosotros" className={styles.item_menu}>Nosotros</Link>
                <Link to="/contactos" className={styles.item_menu}>Contacto</Link>
                <Link to="/equipo" className={styles.item_menu}>Equipo</Link>
                <Link to="/personajes" className={styles.item_menu}>Personajes</Link>
            </nav>
        </header>
    );
}
