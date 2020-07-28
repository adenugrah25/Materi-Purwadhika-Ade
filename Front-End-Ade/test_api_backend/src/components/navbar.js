import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export default function () {
    return (
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Fullstack App Ade</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/products">Product</Nav.Link>
      <Nav.Link href="/category">Category</Nav.Link>
      <Nav.Link href="/product-category">Product Category</Nav.Link>
    </Nav>
   </Navbar.Collapse>
</Navbar>
    )
}