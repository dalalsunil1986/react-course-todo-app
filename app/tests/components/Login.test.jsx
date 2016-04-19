import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import $ from 'jquery'

import * as actions from 'actions';
import {Login} from 'Login';

describe('Login', () => {
  // Test variables
  const exampleEmail = 'test@example.com';
  const examplePassword = 'password123!';
  var spy;
  var login;
  var $el;

  beforeEach(() => {
    spy = expect.createSpy();
    login = TestUtils.renderIntoDocument(<Login dispatch={spy}/>);
    $el = $(ReactDOM.findDOMNode(login));
  });

  it('should exist', () => {
    expect(Login).toExist();
  });


  it('should dispatch user creation on submit', () => {
    login.refs.email.value = exampleEmail;
    login.refs.password.value = examplePassword;
    TestUtils.Simulate.submit($el.find('form')[0]);

    expect(spy).toHaveBeenCalledWith(actions.startLogin(exampleEmail, examplePassword));
  });

});
