import "../pageStyles.css";

const integrantes = [
    {
        nombre: "Rick Sanchez",
        rol: "Cientifico de portales",
        imagen: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    },
    {
        nombre: "Morty Smith",
        rol: "Explorador de dimensiones",
        imagen: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    },
    {
        nombre: "Summer Smith",
        rol: "Estratega del equipo",
        imagen: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    },
    {
        nombre: "Beth Smith",
        rol: "Soporte cientifico",
        imagen: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
    },
];

export const EquipoPage = () => {
    return (
        <section className="page_shell">
            <div>
                <span className="eyebrow">Tripulacion</span>
                <h1 className="page_title">Equipo interdimensional</h1>
                <p className="page_text">
                    Un grupo listo para cruzar portales, documentar hallazgos y mantener
                    la interfaz conectada con la tematica de Rick and Morty.
                </p>
            </div>

            <div className="team_grid">
                {integrantes.map((integrante) => (
                    <article className="member_card" key={integrante.nombre}>
                        <img src={integrante.imagen} alt={integrante.nombre} />
                        <h3>{integrante.nombre}</h3>
                        <p>{integrante.rol}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
