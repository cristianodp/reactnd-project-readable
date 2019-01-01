import { getAllCategories } from "../utils/ReadableAPI";

export const RECIVER_CATEGORIES = "RECIVER_CATEGORIES";

export function reciverCategories(categories) {
  return {
    type: RECIVER_CATEGORIES,
    categories: categories
  };
}

export function handleReciverCategories() {
  return dispatch => {
     getAllCategories()
      .then(data => {
        dispatch(reciverCategories(data));
      })
      .catch(e => {
        console.warn("Error in handleReciverCategories: ", e);
      });
  };
}
