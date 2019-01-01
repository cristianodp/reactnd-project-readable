import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { formatDate } from "../utils/helpers";
import ErroPage from "./ErrorPage";
import NewComment from "./NewComment";
import ActionButtons from "./ActionButtons";

import {
  handleSetVoteOnPost,
  handleUpdatePost,
  handleDeletePost
} from "../actions/posts";

class Post extends Component {
  state = { redirect: false };

  handleOnClickVote = (id, vote) => () => {
    this.props.handleSetVoteOnPost(id, vote);
  };

  handleEditTitlePost = () => {
    const { post } = this.props;
    const value = prompt("Type the new title for the post", post.title);
    if (value && value.length > 0) {
      post.title = value;
      this.props.handleUpdatePost(post);
    }
  };

  handleEditBodyPost = () => {
    const { post } = this.props;
    const value = prompt("Type the new body for the post", post.body);
    if (value && value.length > 0) {
      post.body = value;
      this.props.handleUpdatePost(post);
    }
  };

  handleOnDelete = id => () => {
    this.props.handleDeletePost(id);
  };

  render() {
    const { classes, post, commentEnabled } = this.props;

    if (!post) {
      return <ErroPage text={"Post não encontrado"} />;
    }

    const {
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      commentCount,
      id
    } = post;

    return (
      <Fragment>
        <Card raised={true} className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
              <IconButton
                onClick={this.handleEditTitlePost}
                className={classes.thumb}
              >
                <EditIcon />
              </IconButton>
            </Typography>

            <Typography>{`By ${author} on ${timestamp &&
              formatDate(timestamp)}`}</Typography>
            <Typography className={classes.categoryName}>{category}</Typography>

            <Typography component="p">
              {body}
              <IconButton
                onClick={this.handleEditBodyPost}
                className={classes.thumb}
              >
                <EditIcon />
              </IconButton>
            </Typography>
          </CardContent>

          <ActionButtons
            commentCount={commentCount ? commentCount : 0}
            showComments={true}
            voteScore={voteScore}
            id={id}
            onClickLike={this.handleOnClickVote(id, true)}
            onClickDislike={this.handleOnClickVote(id, false)}
            onClickDelete={this.handleOnDelete(id)}
          />
        </Card>
        {commentEnabled && (
          <ul>
            <li>
              <NewComment parentId={id} />
            </li>
          </ul>
        )}
      </Fragment>
    );
  }
}

const styles = {
  card: {
    width: "auto"
  },
  categoryName: {
    display: "inline",
    padding: 8,
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 8
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleSetVoteOnPost,
      handleUpdatePost,
      handleDeletePost
    },
    dispatch
  );

function mapStateToProps({ posts }, { id }) {
  const { data } = posts;
  return {
    post: data ? data[id] : null
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Post));
