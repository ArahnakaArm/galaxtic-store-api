import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/register';

const RunTestUserRegister = async () => {
    it('Should Be Missing Or Invalid', (done) => {
        const body = {
            email: 'test11@gmail.com',
            password: '123456',
            user_role: 'USER',
            first_name: '123456',
            last_name: '123456',
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
    it('Should Be Conflict', (done) => {
        const body = {
            email: 'conflict@gmail.com',
            password: 'aA12345678-',
            user_role: 'USER',
            first_name: 'conflict',
            last_name: 'conflict',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.be.eql({
                    resultCode: '40900',
                    developerMessage: 'Conflict',
                });
                done();
            });
    });
};

export default RunTestUserRegister;
