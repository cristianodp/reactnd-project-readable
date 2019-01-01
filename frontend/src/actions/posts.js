import { showLoading, hideLoading } from "react-redux-loading";

import {
  getPosts,
  voteOnPost,
  addPost,
  getPostById,
  updatePostDetails,
  deletePost
} from "../utils/ReadableAPI";

export const RECIVER_POSTS = "RECIVER_POSTS";
export const CREATE_NEW_POST = "CREATE_NEW_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const VOTE_ON_POSTS = "VOTE_ON_POSTS";
export const RECIVER_FILTERS_POSTS = "RECIVER_FILTERS_POSTS";
export const CHANGE_FILTERS_POSTS = "CHANGE_FILTERS_POSTS";

export function reciverPosts(posts) {
  return {
    type: RECIVER_POSTS,
    posts: posts
  };
}

export function handleGetPosts(category) {
  return dispatch => {
    getPosts(category)
      .then(data => {
        dispatch(reciverPosts(data));
      })
      .catch(e => {
        console.warn("Error in handleGetPosts: ", e);
      });
  };
}

export function handleGetPostById(postId) {
  return dispatch => {
    dispatch(showLoading());
    getPostById(postId)
      .then(data => {
        dispatch(updatePost(data));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("Error in handleGetPostById: ", e);
        dispatch(hideLoading());
      });
  };
}

function setVoteOnPost(post) {
  return {
    type: VOTE_ON_POSTS,
    votedPost: post
  };
}

export function handleSetVoteOnPost(id, vote) {
  return dispatch => {
    dispatch(showLoading());
    voteOnPost(id, vote)
      .then(data => {
        dispatch(setVoteOnPost(data));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("Error in handleSetVoteOnPost: ", e);
        dispatch(hideLoading());
      });
  };
}

function changeFiltersPost(filters) {
  return {
    type: CHANGE_FILTERS_POSTS,
    filters: filters
  };
}

export function handleChangeFiltersPost(filters) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(changeFiltersPost(filters));
    dispatch(handleGetPosts(filters.categorySelected));
    dispatch(hideLoading());
  };
}

function createNewPost(post) {
  return {
    type: CREATE_NEW_POST,
    newPost: post
  };
}

export function handleCreateNewPost(post) {
  return dispatch => {
    dispatch(showLoading());
    addPost(post).then(data => {
      dispatch(createNewPost(data));
      dispatch(hideLoading());
    });
  };
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    postUpdated: post
  };
}

export function handleUpdatePost(post) {
  return dispatch => {
    dispatch(showLoading());
    updatePostDetails(post)
      .then(data => {
        dispatch(updatePost(data));
        dispatch(hideLoading());
      })
      .catch(e => {
        console.warn("Error in handleGetPostById: ", e);
        dispatch(hideLoading());
      });
  };
}

function deletePostAction(id) {
  return {
    type: DELETE_POST,
    id: id
  };
}

export function handleDeletePost(id) {
  return dispatch => {
    dispatch(showLoading());
    deletePost(id).then(data => {
      dispatch(deletePostAction(data.id));
      dispatch(hideLoading());
    });
  };
}
