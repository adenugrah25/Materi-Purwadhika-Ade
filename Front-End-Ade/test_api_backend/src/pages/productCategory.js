import React from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";

class ProductCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategory: [],
    };
  }

  async componentDidMount() {
    console.log("component did mount");
    //fetch product category data
    try {
      const res = await Axios.get("http://localhost:2000/api/product_category");
      this.setState({ productCategory: res.data });
    } catch (err) {
      console.log(err);
    }
  }

  TableHead = () => {
    return (
      <thead>
        <tr>
          {/* <th>No</th> */}
          <th>ID</th>
          <th>Product-ID</th>
          <th>Category-ID</th>
        </tr>
      </thead>
    );
  };

  TableBody = () => {
    return this.state.productCategory.map((item, index) => {
      return (
        //dikasih key sebagai unique identity
        // <tr key={item.id}>
        <tr>
          {/* <td>{index + 1}</td> */}
          <td>{item.id}</td>
          <td>{item.product_id}</td>
          <td>{item.category_id}</td>
        </tr>
      );
    });
  };

  render() {
    console.log(`state : `, this.state);
    return (
      <div>
        <h1>Table Product Category</h1>
        <Table>
          {this.TableHead()}
          <tbody>{this.TableBody()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ProductCategory;
