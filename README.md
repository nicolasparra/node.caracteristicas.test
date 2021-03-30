# Mundo Puntos Back
Backend con NodeJS y express.

## Variables de entorno
Especificar estas variables en un archivo .env en la carpeta del proyecto

* PORT= puerto de la api (4000 por defecto)
* MUNDO_CREDITO_URL=url de los servicios (http://qamn.mundocredito.cl/MundoCredito es la que se está usando)
* DB_NAME=Nombre base de datos.
* DB_USER=Usuario base de datos.
* DB_PASSWORD=Password base de datos.
* DB_HOST=Host base de datos.

## Despliegue
Instalar dependencias
```bash
npm install
```
Desplegar en producción 
```bash
npm start
```
Desplegar en desarrollo
```bash
npm run dev
```

## Documentación
```bash
/api-docs
```
