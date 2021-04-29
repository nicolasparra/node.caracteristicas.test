// node eventos.js
console.log("-----------------------EVENTOS--------------------------");
// const events= require('events');
// const emitter= new events.EventEmitter();
const eventEmitter = require('events').EventEmitter;
const util = require('util');

var Persona = function(nombre){
    this.nombre = nombre;
}
//Se hereda el eventEmiter
util.inherits(Persona, eventEmitter);

let persona = new Persona('Bob');

//console.log(`Me llamo ${persona.nombre}`);

persona.on('hablar', (mensaje) => {
    console.log(`${persona.nombre}: ${mensaje}`);
});

persona.emit('hablar', 'Hoy es un gran día');

/*
emitter.on('eventoCustom', (mensaje, estatus) => {
    console.log(`${estatus}: ${mensaje}`);
});
emitter.emit('eventoCustom', 'Mensaje cargado con éxito', 200);
*/




