// Pagina de inicio de la aplicacion
// src/componentes/Home/Home.jsx
// Página de inicio: ruta /home
// Muestra el encabezado de bienvenida y un botón por cada obra del arreglo local.
import { Link } from 'react-router-dom';
import { obrasDeArte } from '../../datos/obrasDeArte';
import './Home.css';

const PaginaInicio = () => {
    return (
        <div className="pagina-inicio">
            <h1 className="pagina-inicio__titulo">Bienvenido a mi Galería de Arte</h1>
            <p className="pagina-inicio__subtitulo">
                Selecciona una obra para ver sus detalles
            </p>
            <ul className="pagina-inicio__lista">
                {obrasDeArte.map((obra, indice) => (
                    <li key={obra.id} className="pagina-inicio__item">
                        <Link to={`/art/${obra.id}`} className="pagina-inicio__enlace">
                        <span className="pagina-inicio__numero">
                            {String(indice + 1).padStart(2, '0')}
                        </span>
                        <span className="pagina-inicio__info">
                            <span className="pagina-inicio__nombre-obra">{obra.titulo}</span>
                            <span className="pagina-inicio__nombre-autor">{obra.autor}</span>
                        </span>
                        <span className="pagina-inicio__flecha">→</span>
                        </Link>
                    </li>
                    ))}
            </ul>
        </div>
    );
};

export default PaginaInicio;