//uso js cuando yo no tengo codigo de interfaz
export const obtenerPersonajes = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const data = await response.json();
  return data.results;
};
