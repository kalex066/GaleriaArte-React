// aquí va la lógica que habla con la API externa, cuando otro archivo debe hacer la peticion http a la api
// llaman a la función aca definida.

import axios from 'axios';

const clienteApi = axios.create({
    baseURL: 'https://collectionapi.metmuseum.org/public/collection/v1',
});

// Función que recibe el idObjetoMet de una obra y devuelve la URL de su imagen (o null si la obra no tiene imagen disponible).
export const obtenerUrlImagenObra = async (idObjetoMet) => {
    try {
        // petición GET al endpoint /objects/{id}
        const respuesta = await clienteApi.get(`/objects/${idObjetoMet}`);

        // La API devuelve varios campos perosolo quiero las imágenes.
        const { primaryImage, primaryImageSmall } = respuesta.data;

        // Priorizo la imagen principal; si no existe, usamos la versión pequeña.
        return primaryImage || primaryImageSmall || null;
    } catch (error) {
        // Si la petición falla (obra no existe, error de red, etc.),se registra en consola y devolvemos null para que el componente
        // pueda mostrar un mensaje de "imagen no disponible".
        console.error('Error al obtener la imagen de la obra:', error);
        return null;
    }
};