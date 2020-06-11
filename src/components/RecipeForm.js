import React from "react";
import "./RecipeForm.css";
import MultiSelect from "react-multi-select-component";

export default function RecipeForm(props) {
  const options = props.databaseIngredients.map((ingredient) => {
    return { id: ingredient.id, value: ingredient.id, label: ingredient.name };
  });
  const name = props.databaseIngredients.map((ingredient) => ingredient.id);

  return (
    <form className="pt-5 pb-5" onSubmit={props.onSubmit}>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Name</label>
        <input
          className="form-control"
          type="text"
          name="name"
          onChange={props.onChange}
          value={props.values.name}
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Image link</label>
        <input
          className="form-control"
          type="text"
          name="imageUrl"
          onChange={props.onChange}
          value={props.values.imageUrl}
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Step1</label>
        <input
          className="form-control"
          type="text"
          name="step1"
          onChange={props.onChange}
          value={props.values.step1}
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Step2 (Optional)</label>
        <input
          className="form-control"
          type="text"
          name="step2"
          onChange={props.onChange}
          value={
            props.values.step2 === null || props.values.step2 === ""
              ? ""
              : props.values.step2
          }
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Step3 (Optional)</label>
        <input
          className="form-control"
          type="text"
          name="step3"
          onChange={props.onChange}
          value={
            props.values.step3 === null || props.values.step3 === ""
              ? ""
              : props.values.step3
          }
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Step4 (Optional)</label>
        <input
          className="form-control"
          type="text"
          name="step4"
          onChange={props.onChange}
          value={
            props.values.step4 === null || props.values.step4 === ""
              ? ""
              : props.values.step4
          }
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Step5 (Optional)</label>
        <input
          className="form-control"
          type="text"
          name="step5"
          onChange={props.onChange}
          value={
            props.values.step5 === null || props.values.step5 === ""
              ? ""
              : props.values.step5
          }
        />
      </div>
      <div className="form-group col-sm-12">
        <label className="col-sm-2">Step6 (Optional)</label>
        <input
          className="form-control"
          type="text"
          name="step6"
          onChange={props.onChange}
          value={
            props.values.step6 === null || props.values.step6 === ""
              ? ""
              : props.values.step6
          }
        />
      </div>
      <div className="booleans">
        <div className="form-group col-sm-4">
          <label className="col-sm-12 mb-0">Is Vegan</label>
          <input
            className="form-control"
            type="checkbox"
            name="isVegan"
            onChange={props.onCheck}
            value={props.values.isVegan}
          />
        </div>
        <div className="form-group col-sm-4">
          <label className="col-sm-12 mb-0">Is Vegetarian</label>
          <input
            className="form-control"
            type="checkbox"
            name="isVegetarian"
            onChange={props.onCheck}
            value={props.values.isVegetarian}
          />
        </div>
        <div className="form-group col-sm-4">
          <label className="col-sm-12 mb-0">has Dairy</label>
          <input
            className="form-control"
            type="checkbox"
            name="hasDairy"
            onChange={props.onCheck}
            value={props.values.hasDairy}
          />
        </div>
        <div className="form-group col-sm-4">
          <label className="col-sm-12 mb-0">has Nuts</label>
          <input
            className="form-control"
            type="checkbox"
            name="hasNuts"
            onChange={props.onCheck}
            value={props.values.hasNuts}
          />
        </div>
      </div>
      <MultiSelect
        className="ingSelect"
        placeholder={"Select an ingredient"}
        name={name}
        options={options}
        value={props.ingredients}
        onChange={props.onSelect}
        labelledBy={"Select"}
      />
      <button type="submit" className="btn btn-dark mt-3">
        Done
      </button>
    </form>
  );
}
