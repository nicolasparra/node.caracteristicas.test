//node leerEscribirConsola.js
console.log("--------------------LEER Y ESCRIBIR CON CONSOLA------------------------");
// let name;
// process.stdout.write("Ingresa nombre : \n");
// process.stdin.on('data',function(data){
//     name=data.toString().trim();
//     process.stdout.write(`Hola ${name} \n`);
//     process.exit();
// });

var preguntas = ['Cuál es tu nombre?',
                  'Cuántos años tienes?',
                'Lenguaje de programación favorito?'];

var respuestas = [];

function pregunta(i){
    process.stdout.write(preguntas[i]);
}

process.stdin.on('data', function(data){
    respuestas.push(data.toString().trim());

    if(respuestas.length < preguntas.length){
        pregunta(respuestas.length);
    }else{
        process.exit();
    }
});

pregunta(0);

//console.log("---------------------------------------------------------------------");
