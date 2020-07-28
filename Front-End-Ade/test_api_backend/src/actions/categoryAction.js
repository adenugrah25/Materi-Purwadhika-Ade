import Axios from "axios";
import { GET_CATEGORY, URL } from "./helpers";

export const getCategory = () => {
  //   console.log(`check category-action :`, data);
  //return {
  // type : GET_CATEGORY,
  // payload : data
  //}

  return async (dispatch) => {
    try {
      //get data from API
      const res = await Axios.get(URL + `/category/details`);
      //dispatch memanggil action (yg akan dibaca reducer)
      dispatch({ type: GET_CATEGORY, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addCategory = (body) => {
  return async (dispatch) => {
    try {
      //add data to database
      const res = await Axios.post(URL + '/category/add', body);
      console.log(res.data)

      // get data from database
      const response = await Axios.get(URL + "/category/details");
      dispatch({ type: GET_CATEGORY, payload: response.data });
    } catch (err) {
      console.log(err);
    } 
  }
}
