import React from "react";
// import Axios from "axios";
import { connect } from "react-redux";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import { getProduct, URL, addProduct, deleteProduct, editProduct } from "../actions"; //action for get data

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      selectedIndex: null,
    };
  }
  async componentDidMount() {
    console.log("component did mount");
    this.props.getProduct(); //cuma pakai getProduct karena di dlm getProduct sudah dilakukan Axios (di productAction.js)
  }

  handleAdd = () => {
    console.log("handleAdd function :");
    console.log(`refs handleAdd:`, this.refs);

    //get value
    // let name  = this.refs.name.value;
    // let price = parseInt(this.refs.price.value);
    // let stock = parseInt(this.refs.stock.value);

    const body = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value),
      stock: parseInt(this.refs.stock.value),
    };
    //masukin datanya ke addProduct
    this.props.addProduct(body);
    // try {
    //   //send data to API
    //   const res = await Axios.post(URL + '/products/add', { name, price, stock })
    //   console.log(res.data)

    //   //get data from API
    //   const response = await Axios.get(URL + '/products/')
    //   this.props.getProduct(response.data)
    // } catch (err) {
    //   console.log(err)
    // }
  };

  //ketika ngedelete butuh id untuk menandakan yg mana yg akan didelete, makanya diberikan id & id != index
  handleDelete = (id) => {
    console.log("delete id : ", id); //console log buat ngetes fungsi
    // try {
    //   //delete data from API
    //   const res = await Axios.delete(URL + `/products/delete/${id}`) //tdk perlu di parseInt karena di backend sudah dilakukan
    //   console.log(res.data)

    //   //get data from API
    //   const response = await Axios.get(URL + `/products`)
    //   //refresh redux
    //   this.props.getProduct(response.data)
    // } catch (err) {
    //   console.log(err)
    // }
    this.props.deleteProduct(id);
  };

  handleSave = (id) => {
    console.log('handleSave id: ', id)

    // get data value
    const body = {
      name: this.refs.editname.value,
      price: parseInt(this.refs.editprice.value),
      stock: parseInt(this.refs.editstock.value),
    };
    this.props.editProduct(id, body)
    this.setState({ selectedIndex : null })
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
      if (this.state.selectedIndex === index) {
        return (
          //dikasih key sebagai unique identity
          <tr key={item.id}>
            <td></td>
            <td>
                {" "}
                <InputGroup>
                  <FormControl
                    placeholder="Name"
                    aria-label="Name"
                    ref="editname"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder="Price"
                    className="input"
                    aria-label="Price"
                    ref="editprice"
                    aria-describedby="basic-addon1"
                    type="number"
                  />
                </InputGroup>
              </td>
              <td>
                <InputGroup>
                  <FormControl
                    placeholder="Stock"
                    aria-label="Stock"
                    ref="editstock"
                    aria-describedby="basic-addon1"
                    className="input"
                    type="number"
                  />
                </InputGroup>
              </td>
            <td>
            <Button variant="info" onClick={() => this.handleSave(item.id)}>Save</Button>
            <Button variant="success" onClick={() => this.setState({ selectedIndex: null })}>Cancel</Button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <td>
              <Button
                variant="secondary"
                onClick={() => this.setState({ selectedIndex: index })}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => this.handleDelete(item.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        )
      }
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
                    className="input"
                    aria-label="Price"
                    ref="price"
                    aria-describedby="basic-addon1"
                    type="number"
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
                    className="input"
                    type="number"
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
    product: state.productReducer.data,
  };
};

export default connect(mapStateToProps, {
  getProduct,
  addProduct,
  deleteProduct,
  editProduct
})(Product);
