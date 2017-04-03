import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../components/common/Header';

/**
 *
 * @param {boolean} isAuthenticated
 * @param {boolean} isSuperAdmin
 * @returns {*} a rendered component
 */
function setup(isAuthenticated, isSuperAdmin) {
  const props = {
    logout: () => { },
    searchDocuments: () => { },
    searchResults: {},
    isAuthenticated,
    isSuperAdmin
  };
  return shallow(<Header {...props} />);
}

describe('Header Component', () => {
  it('Should render an IndexLink', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('IndexLink').length).toBe(1);
  });

  it('Should not render any link if not authenticated', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('a').length).toBe(0);
  });

  it('Should render the search link if authenticated', () => {
    const wrapper = setup(true, false);
    expect(wrapper.find('a').first().text()).toBe(' Search');
  });

  it('Should render the logout link if authenticated', () => {
    const wrapper = setup(true, false);
    expect(wrapper.find('a').last().text()).toBe('Logout');
  });

  it('Should only render the Manage link to the SuperAdmin', () => {
    const wrapper = setup(true, true);
    expect(wrapper.find('a').nodes[3].props.children).toBe('Manage');
  });

  it('Should not render the Manage link to a regular user', () => {
    const wrapper = setup(true, false);
    expect(wrapper.find('a').nodes[3].props.children).toNotBe('Manage');
  });
});
