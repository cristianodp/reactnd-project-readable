import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import PostsFilters from "./PostsFilters";
import Post from "./Post";
import NewPost from "./NewPost";
import { getOrderSortFunction, getFilterPost } from "../utils/helpers";

import { handleGetPosts } from "../actions/posts";

class Dashboard extends React.Component {
  state = {
    openDialog: false
  };

  handleShowDialog = isShow => () => {
    this.setState(() => ({ openDialog: isShow }));
  };

  render() {
    const { postsArray, classes, match } = this.props;
    return (
      <Fragment>
        {<PostsFilters match={match} handleOnChangeFilters />}
        <Typography
          className={classes.title}
          gutterBottom
          variant="subtitle1"
          component="h4"
        >
          List of Posts
        </Typography>
        <ul>
          {postsArray.length > 0 &&
            postsArray.map(it => (
              <li key={it.id}>
                <Post id={it.id} />
              </li>
            ))}
        </ul>
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleShowDialog(false)}
        >
          <DialogTitle>Create New Post</DialogTitle>
          <NewPost closeDialog={this.handleShowDialog(false)} />
        </Dialog>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.handleShowDialog(true)}
        >
          <AddIcon />
        </Fab>
      </Fragment>
    );
  }
}

const styles = {
  title: {
    textAlign: "center",
    paddingTop: 8
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16
  }
};

function mapStateToProps({ posts }, props) {
  const { data, filters } = posts;
  const { match } = props;
  filters.categorySelected = match.params.category  ? match.params.category : "all";
  const postsArray = data
    ? Object.keys(data)
        .map(key => data[key])
        .filter(getFilterPost(filters))
        .sort(getOrderSortFunction(filters.order))
    : [];

  return {
    postsArray,
    match: props.match
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleGetPostsByCategory: handleGetPosts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
