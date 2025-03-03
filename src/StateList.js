import React from "react";
import PropTypes from "prop-types";
import CityList from "./CityList";

function StateList({ countryId, states, setCountries }) {
  const addState = () => {
    const name = prompt("Enter state name:");
    if (name) {
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === countryId
            ? {
                ...country,
                states: [
                  ...country.states,
                  { id: Date.now(), name, cities: [] },
                ],
              }
            : country
        )
      );
    }
  };

  const editState = (stateId) => {
    const newName = prompt("Enter new state name:");
    if (
      newName &&
      window.confirm("Are you sure you want to update this state?")
    ) {
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === countryId
            ? {
                ...country,
                states: country.states.map((state) =>
                  state.id === stateId ? { ...state, name: newName } : state
                ),
              }
            : country
        )
      );
    }
  };

  const deleteState = (stateId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this state and all its cities?"
      )
    ) {
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === countryId
            ? {
                ...country,
                states: country.states.filter((state) => state.id !== stateId),
              }
            : country
        )
      );
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <button onClick={addState}>Add State</button>
      {states.map((state) => (
        <div
          key={state.id}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h3>{state.name}</h3>
            <button onClick={() => editState(state.id)}>Edit</button>
            <button onClick={() => deleteState(state.id)}>Delete</button>
          </div>
          <CityList
            countryId={countryId}
            stateId={state.id}
            cities={state.cities}
            setCountries={setCountries}
          />
        </div>
      ))}
    </div>
  );
}

StateList.propTypes = {
  countryId: PropTypes.number.isRequired,
  states: PropTypes.array.isRequired,
  setCountries: PropTypes.func.isRequired,
};

export default StateList;
