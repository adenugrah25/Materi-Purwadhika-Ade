import React from "react";
import Axios from "axios";
import { connect } from 'react-redux'
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { getProduct } from '../actions' //action for get data

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
    };
  }
  async componentDidMount() {
    console.log("component did mount");
    //fetch product data
    try {
      const res = await Axios.get("http://localhost:2000/api/products"); //alamat axiosnya sesuaikan dgn alamat yg dibuat
      // this.setState({ product: res.data });
      console.log(`check res data :`,res.data)
      this.props.getProduct(res.data)
    } catch (err) {
      console.log(err);
    }
  }

  handleAdd = () => {
    console.log('handleAdd function :',)
  }

  TableHead = () => {
    return (
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Action</th>
          
        </tr>
      </thead>
    );
  };

  TableBody = () => {
    return this.props.product.map((item, index) => {
      return (
        //dikasih key sebagai unique identityyy
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{item.stock}</td>
          <td>
            <Button variant="secondary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    console.log(`state : `, this.state);
    return (
      <div>
        <h1>Table Product</h1>
        <Table>
          {this.TableHead()}
          <tbody>
          {this.TableBody()}
          <tr>
              <td></td>
              <td>
                {" "}
                <InputGroup>
                  <FormControl
                    placeholder="Name"
                    aria-label="Name"
                    ref="name"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder="Price"
                    aria-label="Price"
                    ref="price"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder="Stock"
                    aria-label="Stock"
                    ref="stock"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </td>
              <td>
                <Button variant="primary" onClick={this.handleAdd}>
                  Add
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //productReducer -> ikutin yg dari index.js reducer
    product : state.productReducer.data
  }
  
}

export default connect(mapStateToProps, {getProduct})(Product);
