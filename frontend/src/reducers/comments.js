import {
  RECIVER_COMMENTS,
  VOTE_ON_COMMENT,
  CREATE_NEW_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from "../actions/comments";

export default function comments(state = {}, action) {
  switch (action.type) {
    case RECIVER_COMMENTS:
      return { ...state, ...action.comments };
    case VOTE_ON_COMMENT: {
      const { id } = action.votedComment;
      return {
        ...state,
        [id]: action.votedComment
      };
    }
    case CREATE_NEW_COMMENT: {
      const { id } = action.newComment;
      return {
        ...state,
        [id]: action.newComment
      };
    }
    case UPDATE_COMMENT: {
      const { id } = action.commentUpdated;
      return {
        ...state,
        [id]: action.commentUpdated
      };
    }
    case DELETE_COMMENT: {
      delete state[action.id];
      return { ...state };
    }
    default:
      return state;
  }
}
