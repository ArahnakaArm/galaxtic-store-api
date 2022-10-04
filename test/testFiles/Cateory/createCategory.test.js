import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
chai.use(chaiHttp);
chai.should();
const host = 'http://localhost:3001';
const path = '/api/main-category';

const RunTestCreateCategory = async () => {
    it('Should Be Unauthorized', (done) => {
        const body = {
            main_category_name: 'craet 23d',
            main_category_image_url: 'asdasdads',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .send(body)
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
        const body = {
            main_category_name: 'craet 23d',
            main_category_image_url: 'asdasdads',
        };
        chai.request(`${host}`)
            .post(`${path}`)
            .set('authorization', `Bearer ${token}`)
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
    /*     it('Should Be By Id Success', (done) => {
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
    }); */
    /*     it('Should Be By Id Not Found', (done) => {
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
    }); */
};

export default RunTestCreateCategory;
