const api = "http://localhost:3001";

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

const genereteId = () =>
  new Date().getTime().toString(36) +
  Math.ceil(Math.random() * 99999).toString(36);

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = category =>
  category !== "all" ? getPostsByCategory(category) : getAllPosts();

export const getPostsByCategory = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
      const obj = {};
      data.map(it => (obj[it.id] = it));
      return obj;
    });

export const getPostById = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => {
      const obj = {};
      data.map(it => (obj[it.id] = it));
      return obj;
    });

export const addPost = post => {
  let newPost = post;
  newPost.id = genereteId();
  newPost.timestamp = new Date().getTime();
  newPost.voteScore = -1;
  newPost.commentCount = 0;
  return fetch(`${api}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  }).then(res => {
    var rep = res.json();
    return rep;
  });
};
export const updatePostDetails = post =>
  fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title: post.title, body: post.body })
  }).then(res => res.json());

export const voteOnPost = (id, vote) => {
  return fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote ? "upVote" : "downVote" })
  }).then(res => res.json());
};

export const deletePost = id =>
  fetch(`${api}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
    //body: JSON.stringify({ option: vote ? "upVote" : "downVote" })
  }).then(res => res.json());

export const getCommentsByPostId = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => {
      const obj = {};
      data.map(it => (obj[it.id] = it));
      return obj;
    });

export const getCommentById = id =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const addComment = comment => {
  comment.id = genereteId();
  comment.timestamp = new Date().getTime();
  comment.voteScore = 0;

  return fetch(`${api}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());
};
export const updateComment = comment =>
  fetch(`${api}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const voteOnComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote ? "upVote" : "downVote" })
  }).then(res => res.json());

export const deleteComment = id =>
  fetch(`${api}/comments/${id}`, {
    method: "DELETE",
    headers: { ...headers }
  }).then(res => res.json());
