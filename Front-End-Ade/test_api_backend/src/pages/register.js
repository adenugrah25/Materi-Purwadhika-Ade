import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { signUp } from '../actions'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSignUp = () => {
      const body = { //samakan di register userController
          username      : this.refs.username.value,
          email         : this.refs.email.value,
          password      : this.refs.password.value,
          confpassword  : this.refs.confpassword.value
      }
      console.log('body : ', body)
      //dikirim ke Axios di userAction
      this.props.signUp(body)
  }

  render() {
    //check status register
    if (this.props.status) {return <Redirect to='/login'/>}
    return (
      <div className="register-container">
        <h1>Register</h1>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" ref="username" />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              ref="email"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              ref="password"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              ref="confpassword"
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.handleSignUp}>
          Sign Up
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status : state.userReducer.register_status
  }
}

export default connect(mapStateToProps, { signUp })(Register);
