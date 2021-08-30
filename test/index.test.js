const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app.listen());
const expect = require('chai').expect;

const text = {username: 'john', 'password': 'lucifer'};
let token = '';

describe('测试接口', function(){

  before('Before all tests.', function(done) {
    request
      .post('/api/user/create')
      .send(text)
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(0);
        done();
      })
  });

  after('After all tests.', function(done) {
    request
      .get('/api/user/cancel')
      .set('Cookie', ['SESSDATA=' + token])
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).to.be.equal(0);
        done();
      })
  });

  describe('login tests', function(){
    it('登陆用户', (done) => {
      request
        .post('/api/user/login')
        .send(text)
        .expect(200)
        .end((err, res) => {
          expect(res.body.code).to.be.equal(0);
          expect(res.body.data).to.be.a('string');
          token = res.body.data;
          done();
        })
    })
  })
})