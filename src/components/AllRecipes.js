import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes } from "../store/actions/recipe";
import { getUsers } from "../store/actions/users";
import RecipeCard from "./RecipeCard";


class AllRecipes extends Component {
  state = {
    load: true,
  };
  componentDidMount = async () => {
    await this.props.getUsers();
    await this.props.getRecipes();
  };

  render() {
    if (this.props.userLogState.jwt) {
      if (this.props.users.length !== 0 && this.props.recipes !== undefined) {
        const recipesCopy = [...this.props.recipes];
        const sortedRecipes = recipesCopy.sort(
          (a, b) => b.createdAt - a.createdAt
        );
        return (
          <div className="container">
            {sortedRecipes.map((recipe) => {
              const recipeAuthorId = recipe.userId;
              let recipeAuthor = this.props.users[0];
              if (this.props.users.length !== 1) {
                recipeAuthor = this.props.users.find(
                  (user) => user.id === recipeAuthorId
                );
              }

              return (
                <div className="recipe" key={recipe.id}>
                  <RecipeCard
                    user={recipeAuthor}
                    recipe={recipe}
                    id={recipe.id}
                    userLogState={this.props.userLogState}
                  />
                </div>
              );
            })}
          </div>
        );
      } else {
        return (
          <div className="showbox">
            <div className="loader">
              <svg className="circular" viewBox="25 25 50 50">
                <circle
                  className="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  strokeWidth="2"
                  strokeMiterlimit="10"
                />
              </svg>
            </div>
          </div>
        );
      }
    }
    return (
      <div className="letOp">
        Forbidden territory. Be a good kid and{" "}
        <Link to={`/login`}> log in </Link>or{" "}
        <Link to={`/signup`}> sign up</Link>.
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.all,
    userLogState: state.userLogState,
    recipes: state.recipe.all,
  };
}
const mapDispatchToProps = { getRecipes, getUsers };

export default connect(mapStateToProps, mapDispatchToProps)(AllRecipes);
