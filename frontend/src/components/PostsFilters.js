import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { handleChangeFiltersPost } from "../actions/posts";

class PostsFilters extends Component {
  handleChange = propName => e => {
    const value = e.target.value;
    const { filters } = this.props;
    filters[propName] = value;
    this.props.handleChangeFiltersPost(filters);
  };

  render() {
    const { classes, categories, filters } = this.props;

    return (
      <form className={classes.root}>
        <Grid container spacing={8}>
          <Grid item sm={3} md={3} xs={3}>
            <TextField
              className={classes.textField}
              select
              label="Category"
              value={filters.categorySelected ? filters.categorySelected : ""}
              onChange={this.handleChange("categorySelected")}
              margin="normal"
            >
              <MenuItem key={0} value={"all"}>
                {"All"}
              </MenuItem>
              {categories.map(it => (
                <MenuItem key={it} value={it}>
                  {it.charAt(0).toUpperCase() + it.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              id="standard-name"
              label="Search"
              className={classes.textField }
              value={filters.search? filters.search : ""}
              onChange={this.handleChange("search")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              className={classes.textField}
              select
              label="Order by"
              value={filters.order ? filters.order : ""}
              onChange={this.handleChange("order")}
              margin="normal"
            >
              {[
                "Votes Decrescent",
                "Votes Increasing",
                "Date Decrescent",
                "Date Increasing"
              ].map(it => (
                <MenuItem key={it} value={it}>
                  {it}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </form>
    );
  }
}

PostsFilters.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  root: { width: "auto" },
  formControl: {
    width: "100%"
  },
  selectEmpty: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "-webkit-fill-available"
  }
});

function mapStateToProps({ categories, posts }) {
  const { filters } = posts;
  return {
    categories:
      categories &&
      Object.keys(categories)
        .map(key => categories[key].name)
        .sort(),
    filters: filters
      ? filters
      : {
          categorySelected: "",
          order: "",
          search: ""
        }
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleChangeFiltersPost }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(PostsFilters));
