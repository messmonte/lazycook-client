import React, { Component } from "react";
import RecipeCard from "./RecipeCard";
import "./ProfileRecipes.css";

class ProfileRecipes extends Component {
  render() {
    if (this.props.recipes) {
    //console.log(this.props.user);  
      return this.props.recipes.map((recipe) => {
        return (
          <div
            className="recipeProfileBox d-flex justify-content-center mb-5"
            key={recipe.id}
          >
            <RecipeCard user={this.props.user} userLogState={this.props.user} recipe={recipe} />
          </div>
        );
      });
    }
  }
}

export default ProfileRecipes;
