import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/main-category';

const RunTestGetCategory = async () => {
    it('Should Be Success', (done) => {
        chai.request(`${host}`)
            .get(`${path}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('developerMessage');
                res.body.should.have.property('resultData');
                done();
            });
    });
    it('Should Be By Id Success', (done) => {
        const cateId = '6cdfb194-55e3-4f43-9bae-754578b5f240';
        chai.request(`${host}`)
            .get(`${path}/${cateId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('developerMessage');
                res.body.should.have.property('resultData');
                done();
            });
    });
    it('Should Be By Id Not Found', (done) => {
        const cateId = 'ae02964e-b77f-4032-a697-db9571bed18f';
        chai.request(`${host}`)
            .get(`${path}/${cateId}`)
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
};

export default RunTestGetCategory;
