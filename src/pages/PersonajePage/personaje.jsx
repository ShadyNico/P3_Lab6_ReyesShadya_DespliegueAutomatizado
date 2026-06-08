import { useState, useEffect } from "react";
import { obtenerPersonajes } from "../../services/obtenerPersonajes.js";
import { PersonajeCard } from "../../components";
import styles from "./personaje.module.css";

export const PersonajePage = () => {
    const [personajes, setPersonajes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let componenteActivo = true;

        const cargarPersonajes = async () => {
            try {
                const data = await obtenerPersonajes();

                if (componenteActivo) {
                    setPersonajes(data);
                }
            } catch {
                if (componenteActivo) {
                    setError("No se pudieron cargar los personajes.");
                }
            } finally {
                if (componenteActivo) {
                    setCargando(false);
                }
            }
        };

        cargarPersonajes();

        return () => {
            componenteActivo = false;
        };
    }, []);

    return(
        <>
          <h1>Personajes Rick and Morty</h1>
          {cargando && <p>Cargando personajes...</p>}
          {error && <p>{error}</p>}
          <div className={styles.listaPersonajes}>
            {
                personajes.map((personaje) => (
                    <PersonajeCard
                     key={personaje.id}
                     nombre={personaje.name}
                     especie={personaje.species}
                     imagen={personaje.image}
                     />
                ))
            }
          </div>
        </>
    )
}
