import React from "react";
import Axios from "axios";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { getCategory } from "../actions"; //action for get data

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
    };
  }

  async componentDidMount() {
    console.log("component did mount");
    //fetch category data
    try {
      const res = await Axios.get("http://localhost:2000/api/category");
      // this.setState({ category : res.data })
      console.log(`check res data :`, res.data);
      this.props.getCategory(res.data);
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
          <th>Category</th>
          <th>Parent-ID</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  TableBody = () => {
    return this.props.category.map((item, index) => {
      return (
        //dikasih key sebagai unique identity
        <tr key={item.id}>
          {/* <td>{index + 1}</td> */}
          <td>{item.id}</td>
          <td>{item.category}</td>
          <td>{item.parent_id}</td>
          <td>
            <Button variant="secondary">Edit</Button>{" "}
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
        <h1>Table Category</h1>
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
                    placeholder="Category"
                    aria-label="Category"
                    ref="addcategory"
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
    //categoryReducer -> ikutin yg dari index.js reducer
    category: state.categoryReducer.data,
  };
};

export default connect(mapStateToProps, { getCategory })(Category);
