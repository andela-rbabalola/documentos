/* eslint require-jsdoc: "off"  */
import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { DashBoard } from '../../components/dashboard/DashBoard';


describe('Dashboard component', () => {
  it('Should render an add button', () => {
    const props = {
      createDocument: () => { },
      dispatch: () => { }
    };

    const wrapper = mount(<DashBoard documents={[]} {...props} />);
    const submitButtonClass = wrapper.find('a').last().hasClass('btn-large');
    expect(submitButtonClass).toBeTruthy();
    const submitButton = wrapper.find('a').last();
    expect(submitButton.props().href).toBe('#createModal');
  });
});
