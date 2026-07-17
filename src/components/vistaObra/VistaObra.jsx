// Vista de obra: ruta /art/:id
// Muestra la obra seleccionada y permite navegar a la anterior, siguiente o al inicio.
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obrasDeArte } from '../../datos/obrasDeArte';
import { obtenerUrlImagenObra } from '../../services/servicioObras';
import MarcoObra from '../MarcoObra/MarcoObra';
import './VistaObra.css';

const VistaObra = () => {
  // useParams lee el parámetro ":id" de la URL actual
    const { id } = useParams();

  // useNavigate para cambiar de ruta mediante botones
    const navegar = useNavigate();

  // guardar la URL de la imagen obtenida de la API
    const [urlImagen, setUrlImagen] = useState(null);

  // Estado para saber si la imagen todavía se está cargando
    const [cargando, setCargando] = useState(true);

  // Buscar la posición (índice) de la obra actual dentro del arreglo,comparando el id de la URL convertido a número.
    const indiceActual = obrasDeArte.findIndex(
        (obra) => obra.id === Number(id)
    );

  // Obtener el objeto completo de la obra actual usando ese índice
    const obraActual = obrasDeArte[indiceActual];

  // useEffect se ejecuta cada vez que cambia el "id" en la URL
    useEffect(() => {
        // Si el id no corresponde a ninguna obra del arreglo, regresamos al home
        if (!obraActual) {
        navegar('/home');
        return;
    }

    // flag para evitar actualizar el estado si el componente ya se desmontó
    let estaMontado = true;

    // Reiniciar el estado antes de pedir la nueva imagen
    setCargando(true);
    setUrlImagen(null);

    // pedir la imagen a la API mediante el servicioObra
    const buscarImagen = async () => {
        const url = await obtenerUrlImagenObra(obraActual.idObjetoMet);
        if (estaMontado) {
            setUrlImagen(url);
            setCargando(false);
        }
    };

    buscarImagen();

    // Función de limpieza: se ejecuta si el componente se desmonta antes de terminar
    return () => {
        estaMontado = false;
        };
    }, [id]);

  // Si por alguna razón no hay obra (mientras se redirige), no hay renderizacion
    if (!obraActual) {
        return null;
    }

  //  existe una obra anterior o siguiente en el arreglo
    const tieneAnterior = indiceActual > 0;
    const tieneSiguiente = indiceActual < obrasDeArte.length - 1;

  // Manejo del click en "Anterior": navega a la obra con índice - 1
    const manejarAnterior = () => {
        if (tieneAnterior) {
        const obraAnterior = obrasDeArte[indiceActual - 1];
        navegar(`/art/${obraAnterior.id}`);
        }
    };

  // Manejo del click en "Siguiente": navega a la obra con índice + 1
    const manejarSiguiente = () => {
        if (tieneSiguiente) {
        const obraSiguiente = obrasDeArte[indiceActual + 1];
        navegar(`/art/${obraSiguiente.id}`);
        }
    };

  // Manejo del click en "Inicio": regresa a la ruta /home
    const manejarInicio = () => {
        navegar('/home');
    };

    return (
        <div className="vista-obra">
        <h1 className="vista-obra__titulo">{obraActual.titulo}</h1>
        <h2 className="vista-obra__autor">{obraActual.autor}</h2>

        {/* Componente que muestra la imagen enmarcada */}
        <MarcoObra
            urlImagen={urlImagen}
            textoAlternativo={obraActual.titulo}
            cargando={cargando}
        />
        <div className="vista-obra__botones">
            <button
            className="vista-obra__boton"
            onClick={manejarAnterior}
            disabled={!tieneAnterior} // se deshabilita si no hay obra anterior
            >
            ⬅ Anterior
            </button>

            <button
            className="vista-obra__boton vista-obra__boton--inicio"
            onClick={manejarInicio}
            >
            Inicio
            </button>

            <button
            className="vista-obra__boton"
            onClick={manejarSiguiente}
            disabled={!tieneSiguiente} // se deshabilita si no hay obra siguiente
            >
            Siguiente ➡
            </button>
        </div>
        </div>
    );
};

export default VistaObra;