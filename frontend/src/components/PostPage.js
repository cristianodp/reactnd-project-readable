import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Post from "./Post";
import Comment from "./Comment";
import { handleReciverComments } from "../actions/comments";

class PostPage extends Component {
  componentDidMount() {
    this.props.handleReciverComments(this.props.id);
  }
  render() {
    const { id, comments, classes } = this.props;
    return (
      <div>
        <Post id={id} commentEnabled={true} />
        {comments && (
          <Typography className={classes.title} variant="h6" component="h4">
            Comments
          </Typography>
        )}
        <ul>
          {comments.map(commentId => (
            <li key={commentId}>
              <Comment id={commentId} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = {
  title: {
    textAlign: "Center"
  }
};

function mapStateToProps({ comments }, props) {
  const { id } = props.match.params;

  return {
    id,
    comments: comments ? Object.keys(comments).map(key => key) : []
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleReciverComments }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostPage));
