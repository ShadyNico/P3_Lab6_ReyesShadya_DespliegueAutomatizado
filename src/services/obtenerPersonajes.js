//uso js cuando yo no tengo codigo de interfaz
const API_URL = import.meta.env.VITE_API_URL;
export const obtenerPersonajes = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
};