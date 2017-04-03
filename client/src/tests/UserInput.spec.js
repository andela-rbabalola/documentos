import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { UserInput } from '../components/common/UserInput';

/**
 * Wrapper function for the shallow function
 *  @returns {*} JSX
 */
function setup() {
  const props = {
    login: () => { }
  };
  return shallow(<UserInput {...props} />);
}

const wrapper = setup();

describe('UserInput Component', () => {
  it('Renders one form element and h5 tag', () => {
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h5').text()).toEqual('SIGN IN');
  });

  it('Renders 2 input elements', () => {
    expect(wrapper.find('input').length).toBe(2);
  });

  it('Renders an image', () => {
    expect(wrapper.find('img').length).toBe(1);
  });

  it('Renders a link to signup', () => {
    expect(wrapper.find('Link').length).toBe(1);
  });
});
