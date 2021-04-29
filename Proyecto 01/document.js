const fs = require('fs');
const os = require('os');

class Document{

    constructor(dir){
        this._content = '';
        this._isSaved = false;
        this._filename = '';
        this._dir = dir;
    }
    //comprobar si el archivo existe
    exists(name){
        return fs.existsSync(`${this._dir}/${name}`);
    }
    //Añadir lineas a un archivo
    append(text){
        this._content += os.EOL + text;
        this._isSaved = false;
    }
    //Guardar archivo
    saveas(name){
        fs.writeFileSync(`${this._dir}/${name}`, this._content);
        this._filename = name;
        this._isSaved = true;
    }
    //
    save(){
        fs.writeFileSync(`${this._dir}/${this._filename}`, this._content);
        this._isSaved = true;
        this._filename = this._filename;
    }

    getContent(){
        return this._content;
    }

    hasName(){
        if(this._filename != ''){
            return true;
        }else{
            return false;
        }
    }
    getName(){
        return this._filename;
    }

    isSaved(){
        return this._isSaved;
    }

    open(name){
        this._content = fs.readFileSync(`${this._dir}/${name}`, 'UTF-8');
        this._filename = name;
        this._isSaved = true;
        return this._content;
    }

}

module.exports = Document;