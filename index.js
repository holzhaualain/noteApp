const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();



// middlewares
function notFound(req,res) {
    res.setHeader("Content-Type", 'text/html');
    res.send(404, "Ups, wir haben alles durchsucht, aber nichts gefunden! ")
}

function errorHandler(err, req, res) {
    res.status(500).end(err.message);
}

function methodOverride(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}


const app = express();

app.use(express.static(path.resolve('public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});
app.get("/newNote", function(req, res){
    res.sendFile("/html/edit-notes.html", {root: __dirname + '/public/'});
});

app.get("/edit-notes", function(req, res){
    res.sendFile("/html/edit-notes.html", {root: __dirname + '/public/'});
});

 app.use(require('./routes/notesRoutes.js'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")(methodOverride));
 app.use(router);
app.use(notFound);
app.use(errorHandler);



const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });