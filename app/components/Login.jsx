var React = require('react');
import {reduxForm} from 'redux-form';
var {connect} = require('react-redux');
var {hashHistory} = require('react-router');
import * as actions from 'actions';

export var Login = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false
    };
  },
  handleSubmit: function(e) {
    const {dispatch, fields: {password, email}} = this.props;

    e.preventDefault();
    this.setState({isLoading: true});

    dispatch(actions.startLogin(email.value, password.value)).then(() => {
      this.setState({isLoading: false});
    }, () => {
      this.setState({isLoading: false});
    });
  },
  render: function() {
    const {isLoading} = this.state;
    const {fields: {password, email}} = this.props;

    return (
      <div className="auth-page">
        <div className="auth-page__box">
          <h3 className="text-center">Login</h3>

          <form onSubmit={this.handleSubmit}>
            <input autoFocus type="text" name="email" ref="email" placeholder="Email" {...email}/>
            <input type="password" name="password" ref="password" placeholder="Password" {...password}/>
            <button className="button expanded" disabled={isLoading}>Login</button>
          </form>

          <p className="auth-page__actions">
            <a href="#/">Signup</a>
            <a href="#/request-reset">Reset</a>
          </p>
        </div>
      </div>
    );
  }
});

export default reduxForm({
  form: 'login',
  fields: ['email', 'password']
})(Login);
