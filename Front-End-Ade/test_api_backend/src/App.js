import React from 'react';
import { connect } from 'react-redux'
import { KeepLogin } from './actions'
import Navbar from './components/navbar'
import Home from './pages/home'
import Product from './pages/products'
import ProductCategory from './pages/productCategory'
import Category from './pages/category'
import Login from './pages/login'
import Register from './pages/register'

import { Route } from 'react-router-dom'

class App extends React.Component {

  componentDidMount () {
    this.props.KeepLogin()
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Route path = '/' component={Home} exact />
        <Route path = '/products' component={Product}/>
        <Route path = '/category' component={Category}/>
        <Route path = '/product-category' component={ProductCategory}/>
        <Route path = '/login' component={Login} />
        <Route path = '/register' component={Register} />
      </div>
    );
  }
}

export default connect(null, { KeepLogin })(App)
