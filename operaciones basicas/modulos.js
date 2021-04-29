//node modulos.js
console.log("-------------------------------Modulos-----------------------------------");
var path = require('path');
var util = require('util');
var v8 = require('v8');

console.log(path.join(__dirname, 'www', 'img', 'home', 'uploads'));
var nombre = "Marcos";
var edad = 25;
var texto = util.format("Hola %s, tienes %d años", nombre, edad);

console.log(v8.getHeapStatistics());
console.log(texto);
util.log("hola");

console.log("");
console.log("Todos los módulos en : https://nodejs.org/api/");
console.log("------------------------------------------------------------------------------");