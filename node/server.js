// // require('dotenv').config();
// const express = require("express");
// const https = require('https');
// const fs = require('fs');

// const app = express();

// // api routes
// const server = require("./server/index");
// app.use("/api", server);


// app.get('/talha', (req, res) => {
//     res.send('Hello World');
// });

// const PORT = process.env.PORT || 80;
// // https.createServer(app).listen(PORT, () => console.log(`API running on localhost:${PORT}`));
// app.listen(PORT, () => console.log(`API running on localhost:${PORT}`));


////////////////////2////////////



var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/rootCA.key', 'utf8');
var certificate = fs.readFileSync('./ssl/rootCA.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate, passphrase: 'codistan_pec_cpd' };
var express = require('express');
var app = express();
// // api routes
const server=require('./server/index');
app.use("/api",server);
app.get('/talha', (req, res) => {
    res.send('Hello World');
    console.log('Hello World');
    
});

const PORT = process.env.PORT || 5000;
var httpServer = http.createServer(app);
httpServer.listen(PORT,()=>{console.log("runing on ",PORT)});

// var httpsServer = https.createServer(app);
// httpServer.listen(PORT);




