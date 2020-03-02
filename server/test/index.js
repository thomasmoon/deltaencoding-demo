// Import required testing libraries
var chai = require('chai')
  , chaiHttp = require('chai-http');

// Helper function used in assersions from response
let should = chai.should();

// Use chai http to debug the microservice
chai.use(chaiHttp);

// Examples of uncompressed and compressed strings
const textNormal =`myxa
myxophyta
myxopod
nab
nabbed
nabbing
nabit
nabk
nabob
nacarat
nacelle`;

const textCompressed = `0 myxa
3 ophyta
5 od
0 nab
3 bed
4 ing
3 it
3 k
3 ob
2 carat
3 elle`;

describe('/POST uncompressed text', () => {
    it('it should return compressed text', (done) => {
            chai.request('http://localhost:3000')
            .post('/compress')
            .send(textNormal)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.string(textCompressed);
            done();
            });
    });
});

describe('/POST compressed text', () => {
    it('it should return decompressed text', (done) => {
            chai.request('http://localhost:3000')
            .post('/decompress')
            .send(textCompressed)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.string(textNormal);
            done();
            });
    });
});