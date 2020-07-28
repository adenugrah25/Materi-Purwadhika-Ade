import React from 'react';
import Navbar from './components/navbar'
import Home from './pages/home'
import Product from './pages/products'
import ProductCategory from './pages/productCategory'
import Category from './pages/category'

import { Route } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Route path = '/' component={Home} exact />
        <Route path = '/products' component={Product}/>
        <Route path = '/category' component={Category}/>
        <Route path = '/product-category' component={ProductCategory}/> 
        {/* <Product/> */}
      </div>
    );
  }
}

export default App;
