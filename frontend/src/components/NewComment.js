import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ClassNames from "classnames";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import { handleCreateNewComment } from "../actions/comments";

class NewComment extends Component {
  state = {
    comment: {
      body: "",
      author: "",
      parentId: this.props.parentId
    },
    error: {}
  };

  handleChange = propName => e => {
    const value = e.target.value;
    const { comment, error } = this.state;
    comment[propName] = value;
    delete error[propName];
    this.setState(() => ({ comment, error }));
  };

  handleClickSave = () => {
    const { comment } = this.state;

    const error = {};
    Object.keys(comment).map(key =>
      comment[key] === "" ? (error[key] = `${key} is required`) : null
    );

    this.setState(() => ({ error }));
    if (Object.keys(error).length > 0) {
      return;
    }

    this.props.handleCreateNewComment(comment);
    this.setState(() => ({
      error: {},
      comment: {
        body: "",
        author: "",
        parentId: this.props.parentId
      }
    }));
  };

  render() {
    const { classes } = this.props;
    const { comment, error } = this.state;
    return (
      <Card className={classes.root}>
        <Typography className="center" variant="h6" component="h4">
          New Comment
        </Typography>

          <TextField
            label="Author"
            required
            className={classes.textField}
            value={comment.author}
            onChange={this.handleChange("author")}
            error={error["author"] ? true : false}
            helperText={error["author"] ? error["author"] : ""}
            margin="dense"
          />

          <TextField
            label="Body"
            required
            placeholder="What is happening?"
            maxLength={280}
            cols={10}
            rows={3}
            multiline={true}
            InputProps={{ className: classes.textArea }}
            className={ClassNames(classes.textField,classes.containerTextArea)}
            InputLabelProps={{ className: classes.inputLabelProps }}
            value={comment.body}
            onChange={this.handleChange("body")}
            error={error["body"] ? true : false}
            helperText={error["body"] ? error["body"] : ""}
            margin="dense"
          />

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
       
      </Card>
    );
  }
}

const styles = theme => ({
  root: { width: "auto", padding: 16 },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "-webkit-fill-available"
  },
  containerTextArea:{
    marginLeft:0,
    padding: 0,
    borderStyle: 'solid',
    marginRight: 0,
  },
  inputLabelProps:{
    marginLeft:8,
  },
  textArea: {
    border: 1,
    borderStyle: "solid",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,

  },
  button: {
    margin: theme.spacing.unit,
    float: "right"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  containerButtons: {
    float: "right",
    width: 250
  }
});

function mapStateToProps({ posts }, { parentId }) {
  return {
    parentId,
    post: posts ? posts[parentId] : null
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleCreateNewComment }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewComment));
