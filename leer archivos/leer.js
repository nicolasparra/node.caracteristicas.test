// node leer.js
const fs = require("fs");

//La función sincrona toma el proceso principal de nodejs y una vez que termine continua con el código.
//var files = fs.readdirSync('./');
//Ya no tiene la parte de sync, pues esta es una función asincrona
fs.readdir('./', (error, files) => {

    if(error){
        throw error;
    }
    console.log(files);

    //var archivo = fs.readFileSync('./archivo.txt', 'UTF-8');

    fs.readFile('./archivo.txt','UTF-8', (error, archivo) => {
        if(error){
            throw error;
        }
        console.log(archivo);
    });
    console.log('Contenido del archivo...');
});