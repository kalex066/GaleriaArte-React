# 🎨 Galería de Arte Interactiva

Aplicación web desarrollada en **React** que permite explorar una colección de obras de arte reales, obtenidas dinámicamente desde la API del **Metropolitan Museum of Art**, con navegación fluida entre rutas y un diseño personalizado.

---

## 📋 Descripción

Esta galería ofrece una experiencia de navegación tipo "recorrido de museo": el usuario ingresa desde una página de inicio, elige una obra de una lista, y puede desplazarse hacia la obra **anterior** o **siguiente** sin volver a la lista, o regresar al **inicio** en cualquier momento.

Las imágenes de las obras no están almacenadas localmente: se obtienen en tiempo real mediante **axios** desde la API pública del Met Museum, mientras que los metadatos (título, autor, orden) se mantienen en un arreglo local para un acceso rápido y predecible.

---

## ✨ Características

- 🖼️ Listado de 10 obras de arte reales con título y autor.
- 🔀 Rutas dinámicas (`/art/:id`) mediante **React Router**.
- 🌐 Carga de imágenes en tiempo real desde una API externa con **axios**.
- ⏮️ ⏭️ Navegación secuencial entre obras (Anterior / Siguiente), con botones deshabilitados en los extremos del recorrido.
- 🏠 Botón de regreso rápido al inicio desde cualquier obra.
- 🧩 Componentes reutilizables, cada uno con su propio archivo `.jsx` y `.css`.
- 📱 Diseño centrado y responsivo.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| [React](https://react.dev/) | Librería principal para construir la interfaz |
| [Vite](https://vitejs.dev/) | Entorno de desarrollo y build |
| [React Router DOM](https://reactrouter.com/) | Manejo de rutas y navegación (`useParams`, `useNavigate`) |
| [Axios](https://axios-http.com/) | Peticiones HTTP a la API del Met Museum |
| [Met Museum Collection API](https://metmuseum.github.io/) | Fuente de las imágenes de las obras |

---

## 📁 Estructura del proyecto

```
src/
├── main.jsx                     # Punto de entrada de la aplicación
├── App.jsx                      # Configuración de rutas (React Router)
├── App.css
├── index.css                    # Estilos globales
├── datos/
│   └── obrasDeArte.js           # Arreglo local con título, autor e ID de cada obra
├── services/
│   └── servicioObras.js         # Lógica de conexión con la API (axios)
└── components/
    ├── PaginaInicio/
    │   ├── PaginaInicio.jsx     # Ruta /home
    │   └── PaginaInicio.css
    ├── VistaObra/
    │   ├── VistaObra.jsx        # Ruta /art/:id
    │   └── VistaObra.css
    └── MarcoObra/
        ├── MarcoObra.jsx        # Componente que enmarca la imagen de la obra
        └── MarcoObra.css
```

---

## 🗺️ Rutas de la aplicación

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | — | Redirige automáticamente a `/home` |
| `/home` | `PaginaInicio` | Muestra el encabezado de bienvenida y el listado de obras |
| `/art/:id` | `VistaObra` | Muestra la obra correspondiente al `id` de la URL |
| `*` (cualquier otra ruta) | — | Redirige a `/home` |

---

## 🚀 Instalación y ejecución

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd galeria-arte
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

### 4. Abrir en el navegador

```
http://localhost:5173/home
```

---

## 🖼️ Fuente de datos

Las imágenes se obtienen desde el endpoint público de la API del Metropolitan Museum of Art:

```
GET https://collectionapi.metmuseum.org/public/collection/v1/objects/{idObjetoMet}
```

No requiere API key ni autenticación. El campo `idObjetoMet` de cada obra en `obrasDeArte.js` corresponde al `objectID` real del catálogo en línea del museo (`metmuseum.org/art/collection/search/{id}`).

> Puedes agregar más obras buscando en la [colección del Met](https://www.metmuseum.org/art/collection/search) y copiando el número al final de la URL de cualquier obra.

---

## 📌 Notas

- Si alguna obra no tiene imagen disponible en la API, el componente `MarcoObra` muestra automáticamente el mensaje **"Imagen no disponible"**.
- Los botones **Anterior** y **Siguiente** se deshabilitan automáticamente cuando el usuario llega al primer o último elemento del arreglo de obras.
