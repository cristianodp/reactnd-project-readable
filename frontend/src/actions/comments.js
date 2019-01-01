import { showLoading, hideLoading } from "react-redux-loading";
import { updatePost } from "./posts";

import {
  getCommentsByPostId,
  voteOnComment,
  addComment,
  getPostById,
  updateComment,
  deleteComment
} from "../utils/ReadableAPI";

export const RECIVER_COMMENTS = "RECIVER_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const CREATE_NEW_COMMENT = "CREATE_NEW_COMMENT";
export const VOTE_ON_COMMENT = "VOTE_ON_COMMENT";

export function reciverComments(comments) {
  return {
    type: RECIVER_COMMENTS,
    comments: comments
  };
}

export function handleReciverComments(postId) {
  return dispatch => {
    getCommentsByPostId(postId)
      .then(data => {
        dispatch(reciverComments(data));
      })
      .catch(e => {
        console.warn("Error in handleReciverComments: ", e);
      });
  };
}

function setVoteOnComment(comment) {
  return {
    type: VOTE_ON_COMMENT,
    votedComment: comment
  };
}

export function handleSetVoteOnComment(id, vote) {
  return dispatch => {
    dispatch(showLoading());
    voteOnComment(id, vote)
      .then(data => {
        dispatch(setVoteOnComment(data));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("Error in handleSetVoteOnComment: ", e);
        dispatch(hideLoading());
      });
  };
}

function createNewComment(comment) {
  return {
    type: CREATE_NEW_COMMENT,
    newComment: comment
  };
}

export function handleCreateNewComment(comment) {
  return dispatch => {
    dispatch(showLoading());
    return addComment(comment).then(data => {
      dispatch(createNewComment(data));
      getPostById(data.parentId).then(post => {
        dispatch(updatePost(post));
        dispatch(hideLoading());
      });
    });
  };
}

function updateCommentAction(comment) {
  return {
    type: UPDATE_COMMENT,
    commentUpdated: comment
  };
}

export function handleUpdateComment(comment) {
  return dispatch => {
    dispatch(showLoading());
    return updateComment(comment).then(data => {
      dispatch(updateCommentAction(data));
      dispatch(hideLoading());
    });
  };
}

function deleteCommentAction(id) {
  return {
    type: DELETE_COMMENT,
    id
  };
}

export function handleDeleteComment(commendId) {
  return dispatch => {
    dispatch(showLoading());
    return deleteComment(commendId).then(data => {
      dispatch(deleteCommentAction(data.id));
      getPostById(data.parentId).then(post => {
        dispatch(updatePost(post));
        dispatch(hideLoading());
      });
    });
  };
}
