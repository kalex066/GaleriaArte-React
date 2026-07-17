// Componente que "enmarca" la imagen de la obra, recibe la URL de la imagen, un texto alternativo y un booleano de carga.
import './MarcoObra.css';

const MarcoObra = ({ urlImagen, textoAlternativo, cargando }) => {
    return (
        <div className="marco-obra">
        {cargando ? (
            <div className="marco-obra__placeholder">Cargando imagen...</div>
        ) : urlImagen ? (
            // Si ya tenemos la URL de la imagen, la mostramos
            <img
            src={urlImagen}
            alt={textoAlternativo}
            className="marco-obra__imagen"
            />
        ) : (
            // Si no hay imagen disponible (ni cargando ni con URL), se envia mensaje al usuario
            <div className="marco-obra__placeholder">Imagen no disponible</div>
        )}
        </div>
    );
};

export default MarcoObra;