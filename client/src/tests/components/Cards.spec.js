/* eslint require-jsdoc: "off"  */
import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Cards } from '../../components/dashboard/Cards';

function setup(id) {
  const props = {
    dispatch: () => { },
    document: {},
    id,
  };
  return shallow(<Cards {...props} />);
}

describe('Card component', () => {
  it('Should render an edit link', () => {
    const wrapper = setup(1);
    expect(wrapper.find('a').first().props().href).toBe('#editModal');
  });

  it('Should render a delete link', () => {
    const wrapper = setup(1);
    expect(wrapper.find('i').last().hasClass('fa-trash-o')).toBeTruthy();
  });

  it('Should render a title span', () => {
    const wrapper = setup(1);
    expect(wrapper.find('span').first().hasClass('card-title')).toBeTruthy();
  });
});
