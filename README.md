# Proyecto Final

## Backend

En este repositorio se encuentra el código fuente que gestiona la API con que la funciona el Marketplace.

### Dependencias

* Node.js
* Express.js
* PostgreSQL
* JWT
* CORS
* Dotenv
* Jest
* `swagger-ui`
* `swagger-jsdoc`
* `nodemon`, idealmente de forma global (`npm i nodemon --global`)

### ¿Y Ahora Qué?

Una vez clonado el repositorio, entra en él y ejecuta lo siguiente:

```bash
# yarn
yarn install & nodemon index.js localhost ${PORT}

# pnpm
pnpm install & nodemon index.js localhost ${PORT}

# npm
npm install & nodemon index.js localhost ${PORT}
```

donde `${PORT}` es el puerto en el cual servirá la API.
