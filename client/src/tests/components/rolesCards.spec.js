/* eslint require-jsdoc: "off"  */
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { RolesCard } from '../../components/management/rolesCards';

function setup(id) {
  const props = {
    getRole: () => { },
    updateRole: () => { },
    deleteRole: () => { },
    role: {},
    id,
    currentRole: {},
  };
  return shallow(<RolesCard {...props} />);
}

describe('Card component', () => {
  it('Should render a link to view users with a role', () => {
    const wrapper = setup(1);
    expect(wrapper.find('a').first().props().href).toBe('#view-modal');
  });

  it('Should render a delete link', () => {
    const wrapper = setup(1);
    expect(wrapper.find('i').last().hasClass('fa-trash-o')).toBeTruthy();
  });

  it('Should render a title span', () => {
    const wrapper = setup(1);
    expect(wrapper.find('span').first().hasClass('card-title')).toBeTruthy();
  });

  it('Should render a link to edit', () => {
    const wrapper = setup(1);
    const link = wrapper.find('a').nodes[1].props.children;
    expect(link[0].props.className).toBe('fa fa-pencil-square-o');
    expect(link[1]).toBe(' Edit');
  });
});
