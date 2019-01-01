import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/CloseOutlined";

import { handleCreateNewPost } from "../actions/posts";

class NewPost extends Component {
  state = {
    post: {
      title: "",
      body: "",
      author: "",
      category: ""
    },
    error: {}
  };

  
  handleChange = propName => e => {
    const value = e.target.value;
    const { post, error } = this.state;
    post[propName] = value;
    delete error[propName];
    this.setState(() => ({ post, error }));
  };

  handleClickSave = () => {
    const { post } = this.state;
    const error = {};
    Object.keys(post).map(key =>
      post[key] === "" ? (error[key] = `${key} is required`) : null
    );
    
    this.setState(() => ({ error }));
    if (Object.keys(error).length > 0) {
      return;
    }

    this.props.handleCreateNewPost(post);
    this.props.closeDialog()
    
  };

  render() {
    const { classes, categories,closeDialog } = this.props;
    const { post, error } = this.state;
    return (
      <form className={classes.root}>
        <Grid container spacing={8}>
          <Grid item sm={4} md={4} xs={4}>
            <TextField
              className={classes.textField}
              required
              select
              error={error["category"] ? true : false}
              label="Category"
              value={post.category}
              onChange={this.handleChange("category")}
              helperText={error["category"] ? error["category"] : ""}
              margin="normal"
            >
              {categories.map(it => (
                <MenuItem key={it} value={it}>
                  {it.charAt(0).toUpperCase() + it.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={8} md={8} xs={8}>
            <TextField
              label="Author"
              required
              className={classes.textField}
              value={post.author}
              onChange={this.handleChange("author")}
              error={error["author"] ? true : false}
              helperText={error["author"] ? error["author"] : ""}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              label="Title"
              required
              className={classes.textField}
              value={post.title}
              onChange={this.handleChange("title")}
              error={error["title"] ? true : false}
              helperText={error["title"] ? error["title"] : ""}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <TextField
              label="Body"
              required
              placeholder="What is happening?"
              maxLength={280}
              cols={30}
              rows={10}
              multiline={true}
              className={classes.textField}
              value={post.body}
              onChange={this.handleChange("body")}
              error={error["body"] ? true : false}
              helperText={error["body"] ? error["body"] : ""}
              margin="normal"
            />
          </Grid>
          <Grid item sm={12} md={12} xs={12}>
            <div className={classes.containerButtons}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={this.handleClickSave}
              >
                <SaveIcon className={classes.leftIcon} />
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={closeDialog}
                className={classes.button}
              >
                <CloseIcon className={classes.leftIcon} />
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const styles = theme => ({
  root: { width: "auto", padding: 16 },
  formControl: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "-webkit-fill-available"
  },
  button: {
    margin: theme.spacing.unit,
    width: "40%"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  containerButtons: {
    float: "right",
    width: 250
  }
});

function mapStateToProps({ categories, posts }) {
  const { error } = posts;
  console.log("error", error);

  return {
    categories:
      categories &&
      Object.keys(categories)
        .map(key => categories[key].name)
        .sort()
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleCreateNewPost }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewPost));
