import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { SignUpForm } from '../components/signup/SignUp';

/**
 * Wrapper function for the shallow function
 *  @returns {*} a component
 */
function setup() {
  const props = {
    signup: () => { }
  };
  return shallow(<SignUpForm {...props} />);
}

const wrapper = setup();

describe('Signup Component', () => {
  it('Renders one form element and h5 tag', () => {
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h5').text()).toEqual('SIGN UP');
  });

  it('Renders 4 input elements', () => {
    expect(wrapper.find('input').length).toBe(4);
  });

  it('Renders an image', () => {
    expect(wrapper.find('img').length).toBe(1);
  });

  it('Renders a button to signup', () => {
    expect(wrapper.find('a').text()).toBe('SIGN UP');
  });

  it('Renders a link to signin', () => {
    expect(wrapper.find('Link').length).toBe(1);
  });
});
