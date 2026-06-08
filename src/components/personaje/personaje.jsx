import styles from "./personaje.module.css";
import PropTypes from "prop-types";

export const PersonajeCard = ({nombre, especie, imagen}) => {
     return(
        <div className={styles.PersonajeCard}>
            <img className={styles.imagenPersonaje} src={imagen} alt={nombre} />
            <h3 className={styles.nombrePersonaje}>Nombre: {nombre}</h3> 
            <p>Especie: {especie}</p>
        </div>
    )
}
   

PersonajeCard.propTypes={
    nombre:PropTypes.string,
    especie:PropTypes.string,
    imagen:PropTypes.string
}