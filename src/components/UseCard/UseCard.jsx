import "./UseCard.css";
import PropTypes from "prop-types";
import { useState } from "react";

export const UseCard = ({ nombre, url, edad, activo }) => {
    const [mostrarEdad, setMostrarEdad] = useState(false);
    const [mostrarActividad, setMostrarActividad] = useState(false);
    const [quitarTodo, setQuitarTodo] = useState(false);

    return (
        <div>
            {!quitarTodo && (
                <>
                    <h1>{edad >= 18 ? "Es mayor de edad" : "Es menor de edad"}</h1>
                    <h1>El nombre de la persona es: {nombre}</h1>
                    <h1>Representacion: <img src={url} alt={nombre} /></h1>
                    <h1>Usuario activo?: {activo ? "Si" : "No"}</h1>
                    <h1>{mostrarEdad ? edad : "Edad Oculta"}</h1>
                    <h1>{mostrarActividad ? (activo ? "Si esta activo" : "No esta activo") : "Estado oculto"}</h1>
                </>
            )}

            <button onClick={() => setMostrarEdad(!mostrarEdad)}>
                {mostrarEdad ? "Ocultar Edad" : "Mostrar Edad"}
            </button>
            <button onClick={() => setMostrarActividad(!mostrarActividad)}>
                {mostrarActividad ? "Ocultar estado" : "Ver Estado"}
            </button>
            <button onClick={() => setQuitarTodo(!quitarTodo)}>
                {quitarTodo ? "Ver Todo" : "Ocultar todo"}
            </button>
        </div>
    );
}

UseCard.propTypes = {
    nombre: PropTypes.string.isRequired,
    edad: PropTypes.number,
    url: PropTypes.string.isRequired,
    activo: PropTypes.bool,
}
