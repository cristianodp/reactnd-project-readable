import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import DeleteIcon from "@material-ui/icons/Delete";

const ActionButtons = props => {
  const {
    classes,
    showComments = false,
    commentCount,
    voteScore,
    id,
    onClickLike,
    onClickDislike,
    onClickDelete
  } = props;

  return (
    <CardActions className={classes.containerButtons}>
      {showComments && (
        <Badge
          badgeContent={commentCount?commentCount:0}
          color="primary"
          classes={{ badge: classes.badge }}
        >
          <Button
            to={`/posts/${id}`}
            component={Link}
            size="small"
            color="primary"
          >
            Comments
          </Button>
        </Badge>
      )}
      <div>
        <Badge
          badgeContent={voteScore ? voteScore : 0}
          color="primary"
          classes={{ badge: classes.badge }}
        >
          <Button size="small" color="primary">
            Votes
          </Button>
        </Badge>
        <span className={classes.thumb}>
          <IconButton onClick={onClickLike} className={classes.thumb}>
            <ThumbUp />
          </IconButton>
          <IconButton onClick={onClickDislike} className={classes.thumb}>
            <ThumbDown />
          </IconButton>
        </span>
        <IconButton onClick={onClickDelete} className={classes.delete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </CardActions>
  );
};

ActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickDislike: PropTypes.func.isRequired,
  onClickLike: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired,
  voteScore: PropTypes.number.isRequired,
  commentCount: PropTypes.number,
};

const styles = {
  thumb: {
    paddingLeft: 8
  },
  delete: {
    marginLeft: 32
  },
  containerButtons: {
    background: "#c0c0c052",
    paddingTop: 16
  }
};

export default withRouter(withStyles(styles)(ActionButtons));
