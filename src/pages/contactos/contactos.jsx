import "../pageStyles.css";

export const ContactoPage = () => {
    return (
        <section className="page_shell">
            <div className="contact_panel">
                <div>
                    <span className="eyebrow">Comunicacion interdimensional</span>
                    <h1 className="page_title">Contactos</h1>
                    <p className="page_text">
                        Usa estos canales para enviar mensajes, dudas o coordenadas
                        de nuevos portales para revisar.
                    </p>

                    <div className="contact_list">
                        <div className="contact_item">
                            <strong>Email</strong>
                            portal@rickandmorty.local
                        </div>
                        <div className="contact_item">
                            <strong>Ubicacion</strong>
                            Ciudadela de los Ricks, dimension C-137
                        </div>
                        <div className="contact_item">
                            <strong>Horario</strong>
                            Lunes a viernes, 09:00 - 18:00
                        </div>
                    </div>
                </div>

                <img
                    className="feature_image"
                    src="https://rickandmortyapi.com/api/character/avatar/242.jpeg"
                    alt="Mr Meeseeks"
                />
            </div>
        </section>
    );
}
