import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/forgot-password';

const RunTestForgotPassword = async () => {
    it('Should Be Not Found', (done) => {
        const body = {
            email: 'notfound@gmail.com',
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
    it('Should Be Missing Or Invalid', (done) => {
        const body = {
            email: 'missinggmail.com',
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
};

export default RunTestForgotPassword;
