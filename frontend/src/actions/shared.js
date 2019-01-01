import { showLoading, hideLoading } from "react-redux-loading";

import { getAllCategories } from "../utils/ReadableAPI";
import { reciverCategories } from "./categories";
import { handleChangeFiltersPost } from "./posts";

export function handlerInitialData() {
  return dispatch => {
    dispatch(showLoading());
    getAllCategories()
      .then(categories => {
        dispatch(reciverCategories(categories));
        dispatch(
          handleChangeFiltersPost({
            categorySelected: categories[0].name,
            order: "Votes Decrescent",
            search: ""
          })
        );
        dispatch(hideLoading());
      })
      .catch(e => {
        console.log("getAllCategories ", e);
        dispatch(hideLoading());
      });
  };
}
