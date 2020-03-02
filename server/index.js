// Require Express & Body Parser
const express = require('express');
const bodyParser = require('body-parser');

// Require our own compression class
const { DeltaEncoder } = require('./lib/deltaencoder');

// Initiate express app
const app = express();
const port = 3000;

// Parse the POST body as string
// & big limit to support testing of this wordlist (466551 lines)
// https://raw.githubusercontent.com/dwyl/english-words/master/words.txt
app.use(bodyParser.text({type:"*/*", limit: '5mb'}));

// Compress route
app.post('/compress', (req, res) => {

    // Add headers for Ajax request from client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const deltaEncoder = new DeltaEncoder(req.body);
    res.send(deltaEncoder.compress());
})

// Decompress route
app.post('/decompress', (req, res) => {

    // Add headers for Ajax request from client
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const deltaEncoder = new DeltaEncoder(req.body);
    res.send(deltaEncoder.decompress());
})

// Default Route - Return status 415
app.get('/*', (req, res) => res.sendStatus(415))

app.listen(port, () => console.log(`Text compression microservice listening on port ${port}!`))