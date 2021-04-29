//Para usar ejecutar el siguiente comando.
// node procesos.js --nombre "Nicolas" --edad "25"
console.log("--------------------PROCESOS------------------------");
console.log(process.argv);
function param(p){
    var index =process.argv.indexOf(p);
    return process.argv[index+1];
}
let nombre= param("--nombre");
let edad=param("--edad");
console.log(`Tu nomber es ${nombre} y tienes ${edad} años`);
console.log("--------------------------------------------------");
