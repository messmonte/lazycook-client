import React, { Component } from "react";
import { connect } from "react-redux";
import { updateRecipe, deleteRecipe } from "../store/actions/recipe";
import RecipeForm from "./RecipeForm";

class EditRecipeFormContainer extends Component {
  state = {
    name: "",
    description: "",
    picture: "",
    startDate: "",
    endDate: ""
  };

  onSubmit = event => {
    event.preventDefault();

    const update = {
      name: this.state.name,
      description: this.state.description,
      picture: this.state.picture,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    this.props.updateRecipe(this.props.id, update);
  };

  onDelete = () => {
    this.props.deleteRecipe(this.props.id);
  };
  onChange = event => {
    const { value, name } = event.target;
    // const value = event.target.value
    // const name = event.target.name

    const update = { [name]: value };

    this.setState(update);
  };

  reset = () => {
    this.setState({
      name: "",
      description: "",
      picture: "",
      startDate: "",
      endDate: ""
    });
  };

  render() {
    return (
      <div>
        <RecipeForm
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          values={this.state}
        />
        <button className="btn btn-dark" onClick={this.onDelete}>
          Delete
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateRecipe,
  deleteRecipe
};
export default connect(null, mapDispatchToProps)(EditRecipeFormContainer);
