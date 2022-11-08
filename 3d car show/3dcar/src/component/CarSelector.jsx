import React from "react";
import { cars } from "../constants";

function CarSelector({ handleChange, SelectedCarvalue }) {
  return (
    <select
      class="form-select car-select"
      onChange={handleChange}
      value={SelectedCarvalue}
      aria-label="Default select example"
    >
      {cars.map((elem) => (
        <option value={elem.value}>{elem.name}</option>
      ))}
    </select>
  );
}

export default CarSelector;
