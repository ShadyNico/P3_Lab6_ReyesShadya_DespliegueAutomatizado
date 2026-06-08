import styles from "./card.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

export const Card = ({nombre, edad}) => {
    const [MostrarEdad, setMostrarEdad] = useState(false);
    return <div className={styles.container}>
         <h1 className={styles.titulo}> nombre es: {nombre}, edad es {edad}, y es {edad>=18? "mayor de edad":"menor de edad"}</h1>
         <h2 className={styles.edad}> {MostrarEdad? edad:'Edad Oculta'}</h2>
         <button onClick={()=>{setMostrarEdad(!MostrarEdad)}}> {MostrarEdad? "Ocultar Edad":"Mostrar Edad"}</button>
    </div>
   
}
Card.propTypes={
    nombre:PropTypes.string,
    edad:PropTypes.number
}
