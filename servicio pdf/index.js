var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var fs = require('fs');


//init app
var app = express();


//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("SERVICO PDF");
});



const createBuffer = (content) => new Promise(((resolve, reject) => {
    pdf.create(content).toBuffer((err, buffer) => {
        if (err !== null) { reject(err); }
        else { resolve(buffer); }
    });
}));

async function createQuotationBuffer(content) {
    const PDF = await createBuffer(content);
    return PDF
}

app.get('/pdf', async (req, res) => {
    let stringHtml = await getHTML(res);
    const buffer = await createQuotationBuffer(stringHtml);    
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(buffer),
        'Content-Type': 'application/pdf',
        'Content-disposition': 'attachment;filename=Cotización.pdf',
    })
    res.end(buffer);
});


async function getHTML() {
    const hmtl = await fs.readFileSync(__dirname + '/test.html', (error, data) => {
        if (error) {
            throw error;
        }
        textHtml = data.toString();
        var textHtmlAux = textHtml.replace('${change1}', 'UNO');
        var textHtmlAux2 = textHtmlAux.replace('${change2}', 'DOS');
        textHtml = textHtmlAux2.replace('${change3}', 'TRES');
        return textHtml
    })
    return hmtl.toString();
}


var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port  localhost:' + port));