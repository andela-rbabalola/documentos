/* eslint no-unused-expressions: "off"*/
import chai from 'chai';
import model from '../../models';

const expect = chai.expect;

describe('Create Models', () => {
  it('Should have the User model', () => {
    expect(model.User).to.exist;
  });
  it('Should have the Role model', () => {
    expect(model.Role).to.exist;
  });
  it('Should have the Document model', () => {
    expect(model.Document).to.exist;
  });
  it('Should have the Priviledge model', () => {
    expect(model.Priviledge).to.exist;
  });
});
