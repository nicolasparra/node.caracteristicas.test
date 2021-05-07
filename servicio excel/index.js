const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const XLSX = require('xlsx');
const fileSaver = require('file-saver');
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const Blob = require("cross-blob");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("TEST Excel");
});

//Read Excel convert to json
app.get('/json', (req, res) => {
    try {
        const url = `${__dirname}/test.xlsx`;
        const { Sheets } = XLSX.readFile(url);
        const sheet = Sheets.Sheet1 ? Sheets.Sheet1 : Sheets.Hoja1;
        const rows = XLSX.utils.sheet_to_json(sheet, { raw: true, defval: null });
        res.send(rows);
    } catch (e) {
        console.log('Error: readExcel(pathExcel)');
        throw e;
    }
});

//convert to csv
app.get('/csv', async (req, res) => {
    try {
        const url = `${__dirname}/test.xlsx`;
        const { Sheets } = XLSX.readFile(url);
        const sheet = Sheets.Sheet1 ? Sheets.Sheet1 : Sheets.Hoja1;
        const csv = XLSX.utils.sheet_to_csv(sheet, { raw: true, defval: null });
        // XLSX.writeFile(csv, 'out.csv');
        // res.send('out.csv');
        res.send(csv);
    } catch (e) {
        console.log('Error: readExcel(pathExcel)');
        throw e;
    }
});

//Write and download file
app.get('/download', (req, res) => {
    downLoadExcel();
});

app.listen(3000, () => {
    console.log('');
    console.log('');
    console.log('-------------------------------------------');
    console.log('Documentación:  https://docs.sheetjs.com/');
    console.log('Servidor Corriendo en : localhost:3000/');
})


function downLoadExcel() {
    const data = [{
        "Segment": "Government",
        "Country": "Canada",
        "Product": "Carretera",
        "Discount": "None",
    },
    {
        "Segment": "Government",
        "Country": "Germany",
        "Product": "Carretera",
        "Discount": "None",
    },
    {
        "Segment": "Midmarket",
        "Country": "France",
        "Product": "Carretera",
        "Discount": "None",
    }];
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = {
        Sheets: {
            'data': worksheet
        },
        SheetNames: ['data']
    }
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // // console.log(excelBuffer);
    // let buffer = Buffer.from(excelBuffer);
    // // let arraybuffer = Uint8Array.from(buffer).buffer;
    // fileSaver.saveAs(new Blob([buffer], { type: "application/octet-stream" }), "test.xlsx");
    // saveAsExcel(excelBuffer,'myFile');
    const data2 = new Blob([excelBuffer], { type: EXCEL_TYPE });
    return fileSaver.saveAs(data2, 'test' + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}


function saveAsExcel(buffer, filename) {
    const data = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    // console.log("BLOB");
    // var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // const file =fileSaver.saveAs(blob, "hello world.txt");
    // return file;
}

module.exports = app;