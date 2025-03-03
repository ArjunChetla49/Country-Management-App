import React from "react";
import PropTypes from "prop-types";

function CityList({ countryId, stateId, cities, setCountries }) {
  const addCity = () => {
    const name = prompt("Enter city name:");
    if (name) {
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === countryId
            ? {
                ...country,
                states: country.states.map((state) =>
                  state.id === stateId
                    ? {
                        ...state,
                        cities: [...state.cities, { id: Date.now(), name }],
                      }
                    : state
                ),
              }
            : country
        )
      );
    }
  };

  const deleteCity = (cityId) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === countryId
            ? {
                ...country,
                states: country.states.map((state) =>
                  state.id === stateId
                    ? {
                        ...state,
                        cities: state.cities.filter(
                          (city) => city.id !== cityId
                        ),
                      }
                    : state
                ),
              }
            : country
        )
      );
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <button onClick={addCity}>Add City</button>
      {cities.map((city) => (
        <div key={city.id} style={{ margin: "5px 0" }}>
          <span>{city.name}</span>
          <button
            onClick={() => deleteCity(city.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

CityList.propTypes = {
  countryId: PropTypes.number.isRequired,
  stateId: PropTypes.number.isRequired,
  cities: PropTypes.array.isRequired,
  setCountries: PropTypes.func.isRequired,
};

export default CityList;
