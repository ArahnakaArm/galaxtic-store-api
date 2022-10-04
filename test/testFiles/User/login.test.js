import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/login';

const RunTestUserLogin = async () => {
    it('Should Be Success', (done) => {
        const body = {
            email: 'test3@gmail.com',
            password: 'aA12345678-',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('resultCode');
                res.body.should.have.property('developerMessage');
                res.body.should.have.property('resultData');
                res.body.resultData.should.have.property('token');
                fs.writeFileSync('test/token.txt', res.body.resultData.token || '');
                done();
            });
    });
    it('Should Be Not Found', (done) => {
        const body = {
            email: 'notfound3@gmail.com',
            password: '123456',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.be.eql({
                    resultCode: '40401',
                    developerMessage: 'Data not found',
                });
                done();
            });
    });
    it('Should Be Wrong Password', (done) => {
        const body = {
            email: 'test3@gmail.com',
            password: '1234567894',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.be.eql({
                    resultCode: '40101',
                    developerMessage: 'Wrong Password',
                });
                done();
            });
    });
    it('Should Be Missing Or Invalid', (done) => {
        const body = {
            email: 'test3@gmail.com',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.be.eql({
                    resultCode: '40000',
                    developerMessage: 'Missing or invalid parameter',
                });
                done();
            });
    });
    it('Should Be Not Verified', (done) => {
        const body = {
            email: 'notverify@gmail.com',
            password: 'aA12345678-',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.be.eql({
                    resultCode: '40102',
                    developerMessage: 'User is not verified',
                });
                done();
            });
    });
};

export default RunTestUserLogin;
