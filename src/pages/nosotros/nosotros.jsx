import "../pageStyles.css";

export const NosotrosPage = () => {
    return (
        <section className="page_shell">
            <div className="content_split">
                <img
                    className="feature_image"
                    src="https://rickandmortyapi.com/api/character/avatar/5.jpeg"
                    alt="Jerry Smith"
                />
                <div>
                    <span className="eyebrow">Sobre el proyecto</span>
                    <h1 className="page_title">Una interfaz para explorar mundos</h1>
                    <p className="page_text">
                        Este sitio organiza varias secciones con una identidad visual
                        inspirada en Rick and Morty: tonos oscuros, energia verde portal
                        y detalles brillantes para destacar la informacion.
                    </p>
                    <p className="page_text">
                        La idea es que cada pagina tenga contenido propio y se sienta
                        conectada al mismo universo visual.
                    </p>
                </div>
            </div>

            <div className="info_grid">
                <article className="info_card">
                    <h3>Mision</h3>
                    <p>Presentar informacion clara con una apariencia divertida y coherente.</p>
                </article>
                <article className="info_card">
                    <h3>Estilo</h3>
                    <p>Usar contrastes, imagenes y acentos tipo portal sin saturar la pantalla.</p>
                </article>
                <article className="info_card">
                    <h3>Experiencia</h3>
                    <p>Facilitar la navegacion entre inicio, equipo, contactos y personajes.</p>
                </article>
            </div>
        </section>
    );
}
