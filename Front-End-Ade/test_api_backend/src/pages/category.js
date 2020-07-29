import React from "react";
// import Axios from "axios";
import { Table, Button, InputGroup, FormControl, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { getCategory, addCategory, editCategory, deleteCategory } from "../actions"; //action for get data

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      selectedIndex: null,
    };
  }

  async componentDidMount() {
    console.log("component did mount");
    // //fetch category data
    // try {
    //   const res = await Axios.get("http://localhost:2000/api/category");
    //   // this.setState({ category : res.data })
    //   console.log(`check res data :`, res.data);
    //   this.props.getCategory(res.data);
    // } catch (err) {
    //   console.log(err);
    // }
    this.props.getCategory(); //cuma pakai getCategory karena di dlm getCategory sudah dilakukan Axios (di categoryAction.js)
  }

  handleAdd = () => {
    console.log(`refs handleAdd:`, this.refs);

    // let valueCat = this.refs.addcategory.value;
    // let parentCat = this.refs.idparentcategory.value;
    const body = {
      category: this.refs.addcategory.value,
      parentId: this.refs.idparentcategory.value,
    };
    console.log(
      `categoy :`,
      body.category,
      `parent ID Category :`,
      body.parentId
    );
    this.props.addCategory(body);
  };

  handleSave = (id) => {
    console.log("handleSave id: ", id);
    const body = {
      category: this.refs.addeditcategory.value,
      parent_id: this.refs.editidparentcategory.value,
    };
    this.props.editCategory(id, body);
    this.setState({ selectedIndex: null });
    this.refs.addeditcategory.value = "";
    this.refs.editidparentcategory.value = "";
  };

  handleDelete = (id) => {
    console.log("id : ", id);
    this.props.deleteCategory(id);
  };

  TableHead = () => {
    return (
      <thead>
        <tr>
          {/* <th>No</th> */}
          <th>ID</th>
          <th>Category</th>
          <th>Parent</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  TableBody = () => {
    return this.props.category.map((item, index) => {
      if (this.state.selectedIndex === index) {
        return (
          <tr key={item.id}>
            <td></td>
            <td>
              <FormControl
                placeholder="Category"
                aria-label="Category"
                ref="addeditcategory"
                aria-describedby="basic-addon1"
              />
            </td>
            <td>
              <Form.Control as="select" ref="editidparentcategory">
                {this.props.category.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.category}
                    </option>
                  );
                })}
              </Form.Control>
            </td>
            <td>
              <Button variant="info" onClick={() => this.handleSave(item.id)}>
                Save
              </Button>
              <Button
                variant="success"
                onClick={() => this.setState({ selectedIndex: null })}
              >
                Cancel
              </Button>
            </td>
          </tr>
        );
      } else {
        return (
          //dikasih key sebagai unique identity
          <tr key={item.id}>
            {/* <td>{index + 1}</td> */}
            <td>{item.id}</td>
            <td>{item.category}</td>
            <td>{item.parent}</td>
            <td>
              <Button
                variant="secondary"
                onClick={() => this.setState({ selectedIndex: index })}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => this.handleDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        );
      }
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
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Control as="select" ref="idparentcategory">
                    {this.props.category.map((item, index) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.category}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
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

export default connect(mapStateToProps, {
  getCategory,
  addCategory,
  editCategory,
  deleteCategory
})(Category);
