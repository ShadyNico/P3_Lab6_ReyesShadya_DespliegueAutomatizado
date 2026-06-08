import styles from "./footer.module.css";

export const Footer = () => {
    const anioActual = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <p className={styles.texto}>Todos los derechos reservados &copy; ESPE {anioActual}</p>
        </footer>
    );
}
