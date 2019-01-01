import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import ActionButtons from "./ActionButtons";
import { formatDate } from "../utils/helpers";
import {
  handleSetVoteOnComment,
  handleUpdateComment,
  handleDeleteComment
} from "../actions/comments";

class Comment extends Component {
  handleOnClickVote = (id, vote) => () => {
    this.props.handleSetVoteOnComment(id, vote);
  };

  handleEditBodyComment = () => {
    const { comment } = this.props;
    const value = prompt("Type the new body for the comment", comment.body);
    if (value && value.length > 0) {
      comment.body = value;
      this.props.handleUpdateComment(comment);
    }
  };

  handleOnDelete = id => () => {
    this.props.handleDeleteComment(id);
  };

  render() {
    const { classes } = this.props;
    const { timestamp, body, author, voteScore, id } = this.props.comment;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography>{`By ${author} on ${timestamp &&
            formatDate(timestamp)}`}</Typography>

          <Typography component="p">
            {body}
            <IconButton
              onClick={this.handleEditBodyComment}
              className={classes.thumb}
            >
              <EditIcon />
            </IconButton>
          </Typography>
        </CardContent>

        <ActionButtons
          voteScore={voteScore}
          id={id}
          onClickLike={this.handleOnClickVote(id, true)}
          onClickDislike={this.handleOnClickVote(id, false)}
          onClickDelete={this.handleOnDelete(id)}
        />
      </Card>
    );
  }
}
Comment.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = {
  card: {
    width: "auto"
  }
};

function mapStateToProps({ comments, loadingBar }, { id }) {
  return {
    comment: comments ? comments[id] : {},
    loading: loadingBar ? loadingBar.default === 1 : true
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { handleSetVoteOnComment, handleUpdateComment, handleDeleteComment },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Comment));
