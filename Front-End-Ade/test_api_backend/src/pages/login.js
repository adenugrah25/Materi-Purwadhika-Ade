import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import { Button, Form } from "react-bootstrap";
import { SignIn } from '../actions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogin = () => {
    const body = {
        username : this.refs.username.value,
        password : this.refs.password.value
    }
    console.log(body)
    this.props.SignIn(body)
    this.refs.username.value = ''
    this.refs.password.value = ''
}

  render() {
    if (this.props.username){return <Redirect to='/products'/>} //kalo login username sudah disimpan, jadi langsung redirect to page products
    return (
        <div className="login-container">
        <h1>Login</h1>
        <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="username" ref="username"/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="password" ref="password"/>
            </Form.Group>
        </Form>
        <Button variant="primary" onClick={this.handleLogin}>Login</Button>
        <p className="p">Don't have Account? <Link to="/register">Sign Up.</Link></p>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      username : state.userReducer.username
  }
}

export default connect(mapStateToProps, { SignIn })(Login)


