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
      const res = await Axios.get(URL + `/category`);
      //dispatch memanggil action (yg akan dibaca reducer)
      dispatch({ type: GET_CATEGORY, payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
};
