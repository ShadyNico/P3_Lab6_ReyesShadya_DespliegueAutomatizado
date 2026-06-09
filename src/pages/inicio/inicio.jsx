import "../pageStyles.css";
import { Link } from "react-router-dom";

export const InicioPage = () => {
    return (
        <section className="page_shell">
            <div className="hero_panel">
                <div>
                    <span className="eyebrow">Portal activo</span>
                    <h1 className="page_title">Bienvenido al universo Rick and Morty - CAMBIO DE PRUEBA</h1>
                    <p className="page_text">
                        Explora una interfaz inspirada en viajes interdimensionales,
                        ciencia extraña y personajes de otros mundos.
                    </p>
                    <Link className="portal_button" to="/personajes">Ver personajes</Link>
                </div>
                <div className="hero_images">
                    <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="Rick Sanchez" />
                    <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" alt="Morty Smith" />
                    <img src="https://rickandmortyapi.com/api/character/avatar/3.jpeg" alt="Summer Smith" />
                </div>
            </div>

            <div className="info_grid">
                <article className="info_card">
                    <h3>Dimensiones</h3>
                    <p>Contenido organizado para navegar entre secciones sin perder el estilo espacial.</p>
                </article>
                <article className="info_card">
                    <h3>Aventuras</h3>
                    <p>Colores, tarjetas e imagenes conectadas con la tematica de la serie.</p>
                </article>
                <article className="info_card">
                    <h3>Portal visual</h3>
                    <p>Una pantalla de inicio mas completa, con imagenes y acentos verdes.</p>
                </article>
            </div>
        </section>
    );
}
