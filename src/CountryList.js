import React from "react";
import PropTypes from "prop-types";
import StateList from "./StateList";

function CountryList({ countries, setCountries }) {
  const deleteCountry = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this country and all its states and cities?"
      )
    ) {
      setCountries((prevCountries) =>
        prevCountries.filter((country) => country.id !== id)
      );
    }
  };

  const editCountry = (id) => {
    const newName = prompt("Enter new country name:");
    if (
      newName &&
      window.confirm("Are you sure you want to update this country?")
    ) {
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === id ? { ...country, name: newName } : country
        )
      );
    }
  };

  return (
    <div>
      {countries.map((country) => (
        <div
          key={country.id}
          style={{
            margin: "20px 0",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2>{country.name}</h2>
            <button onClick={() => editCountry(country.id)}>Edit</button>
            <button onClick={() => deleteCountry(country.id)}>Delete</button>
          </div>
          <StateList
            countryId={country.id}
            states={country.states}
            setCountries={setCountries}
          />
        </div>
      ))}
    </div>
  );
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  setCountries: PropTypes.func.isRequired,
};

export default CountryList;
