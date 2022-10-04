import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/profile';

const RunTestUpdateProfile = async () => {
    it('Should Be Unauthorized', (done) => {
        chai.request(`${host}`)
            .patch(`${path}`)
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

export default RunTestUpdateProfile;
