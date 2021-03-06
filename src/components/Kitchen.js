import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { Multiselect } from "multiselect-react-dropdown";
import "./Kitchen.css";
import { findRecipe, getTipRecipe, resetRecipe } from "../store/actions/recipe";
import { getUsers } from "../store/actions/users";
import {
  getIngredientsForCategory,
  getIngredients,
} from "../store/actions/ingredient";

class Kitchen extends Component {
  multiselectRef = [];
  categoryRef0 = React.createRef();
  categoryRef1 = React.createRef();
  categoryRef2 = React.createRef();
  categoryRef3 = React.createRef();
  categoryRef4 = React.createRef();
  categoryRef5 = React.createRef();
  categoryRef6 = React.createRef();
  categoryRef7 = React.createRef();
  categoryRef8 = React.createRef(); //creating static references to individually target each category
  state = {
    toggled: false,
    ingredientsList: [],
    allIngredients: [],
    tipIngredient: "",
  };
  componentDidMount = async () => {
    await this.props.getUsers();
    await document.body.addEventListener("click", (event) =>
      this.handleUnClick(event)
    );
    await this.props.getIngredients();
    this.multiselectRef = [
      this.categoryRef0,
      this.categoryRef1,
      this.categoryRef2,
      this.categoryRef3,
      this.categoryRef4,
      this.categoryRef5,
      this.categoryRef6,
      this.categoryRef7,
      this.categoryRef8,
    ];
  };

  onIngredientSelect = (newIngredient) => {
    const tempArr = [
      ...this.state.ingredientsList,
      newIngredient[newIngredient.length - 1],
    ];

    this.setState(
      {
        ingredientsList: tempArr,
      },
      this.findMyRecipe
    );
  };

  findMyRecipe = async () => {
    await this.props.findRecipe(this.state.ingredientsList, this.props.history);
    let temp = this.props.allIngredients;
    for (let i = 0; i < temp.length; i++) {
      if (
        this.state.ingredientsList.find((ing) => ing.name === temp[i].name) ===
        undefined
      ) {
        if (this.state.ingredientsList.length !== 0) {
          await this.props.getTipRecipe(
            [...this.state.ingredientsList, temp[i]],
            this.props.history
          );
        }
        if (!this.props.tipRecipe.hasOwnProperty("dataValues")) {
          this.setState({ ...this.state, tipIngredient: temp[i] });
          return;
        }
      }
    }
  };

  onCategorySelect = (categoryId) => {
    this.props.getIngredientsForCategory(categoryId);
  };

  handleClick = (event) => {
    event.target.parentElement.childNodes[0].classList.toggle("changeIndex-2");
    event.target.parentElement
      .querySelector(".categoryListItem")
      .classList.toggle("changeIndex-1");
    event.target.parentElement.querySelector(".searchBox").focus();
    event.target.parentElement.classList.toggle("changeIndex-3");
    this.setState({ toggled: true });
  };

  handleUnClick = (event) => {
    if (this.state.toggled === true) {
      document
        .querySelector(".changeIndex-3")
        .childNodes[0].classList.toggle("changeIndex-2"); //chilled nodes = all children of this element
      document
        .querySelector(".changeIndex-3")
        .childNodes[1].classList.toggle("changeIndex-1");
      document
        .querySelector(".changeIndex-3")
        .classList.toggle("changeIndex-3");
      this.setState({ toggled: false });
    }
  };

  onRemove = async (ingToBeDeleted) => {
    this.multiselectRef[ingToBeDeleted.catIndex].current.resetSelectedValues();
    const filteredArr = this.state.ingredientsList.filter(
      (item) => item.id !== ingToBeDeleted.id
    );
    if (filteredArr.length === 0) {
      this.props.resetRecipe();
    }
    this.setState(
      {
        ingredientsList: filteredArr,
      },
      this.findMyRecipe
    );
  };
  getIng = (id, index) => {
    let arr = [];
    if (this.props.databaseIngredients.length > 0) {
      this.props.databaseIngredients.forEach((item) => {
        if (
          item.categoryId === id &&
          this.state.ingredientsList.find((ing) => ing.name === item.name) ===
            undefined
        ) {
          arr.push({
            id: item.id,
            name: item.name,
            catIndex: index,
          });
        }
      });
    } else {
      arr = [
        {
          id: 0,
          name: "unnamed",
        },
      ];
    }
    return arr;
  };
  render() {
    const recipeAuthorId = this.props.foundRecipe.userId;
    let recipeAuthor = this.props.users[0];
    if (this.props.users.length !== 1) {
      recipeAuthor = this.props.users.find(
        (user) => user.id === recipeAuthorId
      );
    }
    const categoryList = this.props.categories.map((category, index) => {
      return (
        <div
          className={"containerMultiselect " + "containerMultiselect" + index}
          key={category.id}
        >
          <Multiselect
            placeholder=" Select an ingredient"
            resetSelectedValues="false"
            displayValue="name"
            onSelect={(event) => this.onIngredientSelect(event)} // Function will trigger on select event
            options={this.getIng(category.id, index)}
            ref={this.multiselectRef[index]}
          />
          <div
            key={category.id}
            className="categoryListItem"
            onClick={(event) => this.handleClick(event)}
          >
            {category.name}
          </div>
        </div>
      );
    });

    return (
      <div className="row mx-0 categoryListContainer">
        <ul className="col-12 col-sm-3 categoryList">{categoryList}</ul>
        <div className="col-12 col-sm-9 recipeContainer">
          <div className="ingredientBox">
            {this.state.ingredientsList.map((ing, index) => {
              return (
                <span className="bigbox" key={index}>
                  <span className="ingbox" key={index}>
                    {ing.name}
                  </span>
                  <span
                    className="close"
                    onClick={() => this.onRemove(ing)} // Function will trigger on remove event
                  ></span>
                </span>
              );
            })}
          </div>
          {this.state.ingredientsList.length !== 0 ? (
            <div className="recipeBox">
              <div className="title">{this.props.foundRecipe.name}</div>
              {this.props.foundRecipe.length !== 0 &&
              !this.props.foundRecipe.hasOwnProperty("dataValues") ? (
                <div className="recipeIngs">
                  <p className="subtitle">
                    created by LazyCook{" "}
                    <strong>
                      <i>{recipeAuthor.email}</i>
                    </strong>
                  </p>
                  <img
                    className="recipe-image"
                    src={this.props.foundRecipe.imageUrl}
                    alt=""
                  />
                  <div className="ingTitle">
                    Instructions
                    <div className="instructions">
                      {this.props.foundRecipe.step1 ? (
                        <p className="txt">
                          1. {this.props.foundRecipe.step1}{" "}
                        </p>
                      ) : null}
                      {this.props.foundRecipe.step2 ? (
                        <p className="txt">
                          2. {this.props.foundRecipe.step2}{" "}
                        </p>
                      ) : null}
                      {this.props.foundRecipe.step3 ? (
                        <p className="txt">
                          3. {this.props.foundRecipe.step3}{" "}
                        </p>
                      ) : null}
                      {this.props.foundRecipe.step4 ? (
                        <p className="txt">
                          4. {this.props.foundRecipe.step4}{" "}
                        </p>
                      ) : null}
                      {this.props.foundRecipe.step5 ? (
                        <p className="txt">
                          5. {this.props.foundRecipe.step5}{" "}
                        </p>
                      ) : null}
                      {this.props.foundRecipe.step6 ? (
                        <p className="txt">
                          6. {this.props.foundRecipe.step6}{" "}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
          {this.state.ingredientsList.length !== 0 ? (
            !this.props.foundRecipe.hasOwnProperty("dataValues") ? (
              this.props.foundRecipe.length === 0 ? (
                <span className="tipBox">
                  Check your fridge. Found something? Choose its category.
                  Select. Repeat.
                </span>
              ) : this.props.tipRecipe.length === 0 ||
                this.props.tipRecipe.hasOwnProperty("dataValues") ? (
                <span className="tipBox">
                  No more ideas. Create your custom recipe{" "}
                  <Link to={`/profile`}> here </Link>or shop for fresh
                  ingredients at the <Link to={`/store`}> store</Link>.
                </span>
              ) : (
                <span className="tipBox">
                  Psst, add {this.state.tipIngredient.name} to make{" "}
                  {this.props.tipRecipe.name}. Don't have it at home? Shop for{" "}
                  {this.state.tipIngredient.name} at the{" "}
                  <Link to={`/store`}> store</Link>.
                </span>
              )
            ) : this.state.ingredientsList.length === 0 ? (
              <span className="tipBox">
                Check your fridge. Found something? Choose its category. Select.
                Repeat.
              </span>
            ) : (
              <span className="tipBox">
                Odd combination. We're not hating though. Create that recipe{" "}
                <Link to={`/profile`}> here </Link>or shop for fresh ingredients
                at the <Link to={`/store`}> store</Link>.
              </span>
            )
          ) : (
            <span className="tipBox">
              Check your fridge. Found something? Choose its category. Select.
              Repeat.
            </span>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.all,
    allIngredients: state.ingredient.all,
    tipRecipe: state.recipe.tipRecipe,
    foundRecipe: state.recipe.foundRecipe,
    categoryIngredients: state.ingredient.categoryIngredients,
  };
}
const mapDispatchToProps = {
  findRecipe,
  getTipRecipe,
  getIngredientsForCategory,

  getIngredients,
  resetRecipe,
  getUsers,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Kitchen)
);
