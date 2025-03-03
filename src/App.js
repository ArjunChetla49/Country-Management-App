import React, { useState } from "react";
import CountryList from "./CountryList";

function App() {
  const [countries, setCountries] = useState([]);

  const addCountry = () => {
    const name = prompt("Enter country name:");
    if (name) {
      setCountries((prevCountries) => [
        ...prevCountries,
        { id: Date.now(), name, states: [] },
      ]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Country Management System</h1>
      <button onClick={addCountry}>Add Country</button>
      <CountryList countries={countries} setCountries={setCountries} />
    </div>
  );
}

export default App;
