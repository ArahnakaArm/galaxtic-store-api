import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/profile';

const RunTestCreateProfile = async () => {
    it('Should Be Unauthorized', (done) => {
        chai.request(`${host}`)
            .post(`${path}`)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
                res.body.should.be.eql({
                    resultCode: '40100',
                    developerMessage: 'Unauthorized',
                });
                done();
            });
    });
    it('Should Be Conflict', (done) => {
        const token = fs.readFileSync('test/token.txt', { encoding: 'utf8', flag: 'r' });
        chai.request(`${host}`)
            .post(`${path}`)
            .set('authorization', `Bearer ${token}`)
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

export default RunTestCreateProfile;
