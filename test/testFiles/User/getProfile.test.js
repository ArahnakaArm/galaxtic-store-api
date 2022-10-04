import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/profile';

const RunTestGetProfile = async () => {
    it('Should Be Success', (done) => {
        const token = fs.readFileSync('test/token.txt', { encoding: 'utf8', flag: 'r' });
        chai.request(`${host}`)
            .get(`${path}`)
            .set('authorization', `Bearer ${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('developerMessage');
                res.body.should.have.property('resultData');
                done();
            });
    });
    it('Should Be Unauthorized', (done) => {
        chai.request(`${host}`)
            .get(`${path}`)
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
};

export default RunTestGetProfile;
