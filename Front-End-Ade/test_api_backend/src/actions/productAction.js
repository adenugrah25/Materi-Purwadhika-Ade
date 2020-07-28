import Axios from "axios";
import { GET_PRODUCT, URL } from "./helpers";

export const getProduct = () => {
  //   console.log(`check product-action :`, data);
  // return {
  //     type : GET_PRODUCT,
  //     payload : data
  // }

  return async (dispatch) => {
    try {
      //get data from API
      const res = await Axios.get(URL + "/products");
      //dispatch memanggil action (yg akan dibaca reducer)
      dispatch({ type: GET_PRODUCT, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProduct = (body) => {
  return async (dispatch) => {
    try {
      // add data to database
      const res = await Axios.post(URL + "/products/add", body);
      console.log(res.data);

      // get data from database
      const response = await Axios.get(URL + "/products/");
      dispatch({ type: GET_PRODUCT, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      //delete data
      const res = await Axios.delete(URL + `/products/delete/${id}`);
      console.log(res.data);

      // get data from database
      const response = await Axios.get(URL + "/products/");
      dispatch({ type: GET_PRODUCT, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editProduct = (id, body) => {
  return async (dispatch) => {
    try {
      //edit data
      const res = await Axios.patch(URL + `/products/edit/${id}`, body)
      console.log(res.data)

      // get data from database
      const response = await Axios.get(URL + "/products/");
      dispatch({ type: GET_PRODUCT, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  }
}
