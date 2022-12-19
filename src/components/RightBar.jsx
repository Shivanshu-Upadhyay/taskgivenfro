import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import baseUrl from "../config";
let colourOptions = [
  { value: "chocolate", label: "chocolate" },
  { value: "strawberry", label: "strawberry" },
  { value: "vanilla", label: "vanilla" },
  { value: "water", label: "water" },
  { value: "ice", label: "ice" },
  { value: "milk", label: "milk" },
  { value: "sugar", label: "sugar" },
  { value: "salt", label: "salt" },
];
const animatedComponents = makeAnimated();
function RightBar({ setRfresh, selectDish }) {
  const [selectMul, setSelectMul] = useState([]);
  const [dish, setDish] = useState("");
  useEffect(() => {
    setDish(selectDish.name);
    let data = [];
    for (let i of selectDish.ingredients) {
      data.push({ value: i, label: i });
    }
    setSelectMul(data);
  }, [selectDish]);

  const handleCreate = async () => {
    try {
      await axios.post(`${baseUrl}/createDish`, {
        name: dish,
        ingredients: selectMul.map((item) => item.value),
      });

      setRfresh((pre) => !pre);
      setDish("");
      setSelectMul([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await axios.post(`${baseUrl}/updateDish`, {
        id: selectDish.id,
        name: dish,
        ingredients: selectMul.map((item) => item.value),
      });
      setRfresh((pre) => !pre);
      setDish("");
      setSelectMul([]);
    } catch (error) {
      console.log(error);
    }
  };
  if (!selectDish.create) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        
        <div>
          <h3> Click on create button to create new dish</h3>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="formBlock">
        <label htmlFor="">Dish</label>
        <input
          type="text"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
        />
      </div>

      <div className="formBlock">
        <label htmlFor="" style={{ margin: "10px 0px" }}>
          Ingredients
        </label>

        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          value={selectMul}
          options={colourOptions}
          onChange={(e) => setSelectMul(e)}
        />
      </div>

      <div className="btnBox">
        {selectDish.update ? (
          <button className="button-34" onClick={handleUpdate}>
            Update
          </button>
        ) : (
          <button className="button-34" onClick={handleCreate}>
            Create
          </button>
        )}
      </div>
    </div>
  );
}

export default RightBar;
