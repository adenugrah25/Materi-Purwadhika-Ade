import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { LogOut } from '../actions'

// export default function () {
//     return (
//         <Navbar bg="light" expand="lg">
//   <Navbar.Brand href="/">Fullstack App Ade</Navbar.Brand>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//       <Nav.Link href="/products">Product</Nav.Link>
//       <Nav.Link href="/category">Category</Nav.Link>
//       <Nav.Link href="/product-category">Product Category</Nav.Link>
//       <Nav.Link href="/login">Login</Nav.Link>
//     </Nav>
//    </Navbar.Collapse>
// </Navbar>
//     )
// }



class NavBar extends React.Component {
  handleLogOut = () => {
      localStorage.removeItem('id')
      localStorage.removeItem('token')
      this.props.LogOut()
  }

  render () {
      return (
          <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/" className="ml-2">Fullstack App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                      <Link to="/products" className="link">
                          <Nav.Item className="mr-2">Product</Nav.Item>
                      </Link>
                      <Link to="/category" className="link">
                          <Nav.Item className="ml-2">Category</Nav.Item>
                      </Link>
                  </Nav>
                  <Nav className="ml-auto">
                      <Link to="/profile" className="link">
                          <Nav.Item href="#" className="mr-2 m-2" >{this.props.username ? this.props.username : 'user'}</Nav.Item>
                      </Link>
                      {
                          this.props.username ?
                          <Button onClick={this.handleLogOut}>LogOut</Button> :
                          <Link to='/login'>
                              <Button>Login</Button>
                          </Link>
                      }
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      )
  }
}

const mapStateToProps = (state) => {
  console.log(state.userReducer)
  return {
    username : state.userReducer.username
  }
}

export default connect(mapStateToProps, { LogOut })(NavBar)