import { RECIVER_CATEGORIES } from "../actions/categories";

export default function categories(state = {}, action) {
  switch (action.type) {
    case RECIVER_CATEGORIES:
      return { ...state, ...action.categories };
    default:
      return state;
  }
}
