import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
// import testHelper from '../helpers/testHelpers';

const server = supertest.agent(app);
const expect = chai.expect;
let superAdminDetails;

// describe('Pagination Test Suite', () => {
//   before((done) => {
//     server.post('/users/signin')
//       .type('form')
//       .send({ email: 'oyinda@gmail.com', password: 'oyinda123' })
//       .end((err, res) => {
//         superAdminDetails = res.body;
//         done();
//       });
//   });
//   describe('Users Pagination', () => {
//     it('Should return the correct number of users for limit specified', () => {
//       server.post('/users/pagination')
//         .set({ 'x-access-token': superAdminDetails.token })
//         .send({ limit: 2 })
//         .expect(302)
//         .end((err, res) => {
//           console.log('response', res);
//         });
//     });
//   });
// });
