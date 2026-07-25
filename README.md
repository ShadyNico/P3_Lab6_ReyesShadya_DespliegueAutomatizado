# Portal Interdimensional PWA

Aplicación full stack desarrollada para la práctica de laboratorio de PWA,
contenedores y CI/CD. Incluye un frontend React instalable, una API REST con
autenticación JWT, PostgreSQL, Docker Compose y publicación automatizada de
imágenes mediante GitHub Actions.

## Funcionalidades

- Registro e inicio de sesión con contraseña cifrada mediante bcrypt.
- Persistencia del JWT en `localStorage` e interceptor de Axios.
- Ruta `/productos` protegida.
- CRUD completo de productos: consulta, registro, edición y eliminación.
- Mensajes de confirmación y manejo de errores.
- Web App Manifest, iconos 192/512 y Service Worker generado por Workbox.
- Caché del shell de la aplicación y estrategia `NetworkFirst` para consultas
  de productos.
- Contenedores independientes para frontend y backend.
- Orquestación de frontend, backend y PostgreSQL con Docker Compose.
- Pipeline CI/CD para validar, construir y publicar ambas imágenes en Docker Hub.

## Estructura

```text
.
├── .github/workflows/ci.yml
├── backend/
│   ├── database/script.sql
│   ├── routes/
│   ├── tests/
│   └── Dockerfile
├── public/manifest.webmanifest
├── src/
│   ├── pages/productos/
│   ├── routes/ProtectedRoute.jsx
│   └── services/
├── Dockerfile
└── docker-compose.yml
```

## Ejecución local

Requisitos: Node.js 22, npm y PostgreSQL.

1. Copiar `backend/.env.example` como `backend/.env` y ajustar las credenciales.
2. Ejecutar `backend/database/script.sql` en PostgreSQL.
3. Instalar y levantar la API:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. En otra terminal, instalar y levantar React:

   ```bash
   npm install
   npm run dev
   ```

El frontend queda en `http://localhost:5173` y la API en
`http://localhost:3000`.

## Ejecución con Docker

Opcionalmente, copiar `.env.example` como `.env` y cambiar las claves. Luego:

```bash
docker compose up --build
```

Servicios:

- Frontend: `http://localhost:4173`
- Backend: `http://localhost:3000`
- Estado de API y PostgreSQL: `http://localhost:3000/health/db`
- PostgreSQL: `localhost:5432`

Para detener la aplicación:

```bash
docker compose down
```

El volumen `postgres_data` conserva la base de datos. Para reinicializarla
intencionalmente se debe eliminar ese volumen.

## Validación

```bash
npm run check
cd backend
npm test
```

Después de `npm run build`, el directorio `dist/` debe contener
`manifest.webmanifest`, `sw.js`, los iconos y los recursos precacheados.
Ejecuta `npm run preview`, abre Chrome o Edge y usa la opción
**Instalar aplicación**.

## GitHub Actions y Docker Hub

El workflow `.github/workflows/ci.yml` se ejecuta en cada `push` o pull request
hacia `main`:

1. Instala dependencias del frontend, ejecuta ESLint y construye la PWA.
2. Instala dependencias del backend y ejecuta sus pruebas.
3. Construye las imágenes Docker del frontend y backend.
4. En un `push` a `main`, publica las imágenes con etiquetas `latest` y el SHA.

Antes de publicar, crear en **Settings > Secrets and variables > Actions**:

- `DOCKER_USERNAME`: usuario de Docker Hub.
- `DOCKER_PASSWORD`: access token de Docker Hub.

El workflow publicará:

- `<DOCKER_USERNAME>/portal-pwa-frontend`
- `<DOCKER_USERNAME>/portal-pwa-backend`

## API REST

| Método | Ruta | Protección | Descripción |
| --- | --- | --- | --- |
| POST | `/auth/register` | Pública | Registrar usuario |
| POST | `/auth/login` | Pública | Iniciar sesión y obtener JWT |
| GET | `/productos` | Bearer JWT | Listar productos |
| POST | `/productos` | Bearer JWT | Crear producto |
| PUT | `/productos/:id` | Bearer JWT | Actualizar producto |
| DELETE | `/productos/:id` | Bearer JWT | Eliminar producto |
| GET | `/health/db` | Pública | Verificar API y PostgreSQL |

Nunca se deben confirmar archivos `.env`, contraseñas ni tokens en Git.
