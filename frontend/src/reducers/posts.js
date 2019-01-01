import {
  RECIVER_POSTS,
  VOTE_ON_POSTS,
  CHANGE_FILTERS_POSTS,
  RECIVER_FILTERS_POSTS,
  CREATE_NEW_POST,
  UPDATE_POST,
  DELETE_POST
} from "../actions/posts";

export default function posts(state = { data: {}, filters: {} }, action) {
  switch (action.type) {
    case RECIVER_POSTS: {
      return { ...state, data: { ...state["data"], ...action.posts } };
    }
    case UPDATE_POST: {
      const { id } = action.postUpdated;
      return { ...state, data: { ...state["data"], [id]: action.postUpdated } };
    }
    case DELETE_POST: {
      const { data } = state;
      delete data[action.id];
      return { ...state, data: { ...data } };
    }
    case VOTE_ON_POSTS: {
      const { id } = action.votedPost;
      return { ...state, data: { ...state["data"], [id]: action.votedPost } };
    }
    case CREATE_NEW_POST: {
      const { id } = action.newPost;
      return { ...state, data: { ...state["data"], [id]: action.newPost } };
    }
    case RECIVER_FILTERS_POSTS:
      return { ...state, filters: action.filters };
    case CHANGE_FILTERS_POSTS:
      return { ...state, filters: action.filters };
    default:
      return state;
  }
}
