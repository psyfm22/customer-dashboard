import React, { useState, useEffect } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentGender, setCurrentGender] = useState("Male");
  const [currentVerification, setCurrentVerification] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((data) => setCustomers(data));
  }, []);

  async function handleCreateUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUsername,
        currentGender,
        currentVerification,
      }),
    });

    //We await converting the response.json()
    const newBook = await response.json();

    // SetBooks by just adding the new books
    setBooks((books) => [...books, newBook]);

    //Reset the title and author to empty
    setCurrentUsername("");
  }

  function changeUsername(e) {
    setCurrentUsername(e.target.value);
  }

  function changeGender(e) {
    setCurrentGender(e.target.value);
  }
  function changeVerifcation(e) {
    //This needs to be don't as radio button values are strings
    setCurrentVerification(e.target.value === "true");
  }
  return (
    <>
      <h1>Customer Dashboard</h1>
      <input
        type="text"
        placeholder="Username..."
        value={currentUsername}
        onChange={changeUsername}
      />

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={currentGender === "Male"}
            onChange={changeGender}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={currentGender === "Female"}
            onChange={changeGender}
          />
          Female
        </label>
        <p>Current Selection: {currentGender}</p>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="verification"
            value="true"
            checked={currentVerification === true}
            onChange={changeVerifcation}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="verification"
            value="false"
            checked={currentVerification === false}
            onChange={changeVerifcation}
          />
          False
        </label>
        <p>Current Selection: {currentVerification ? "True" : "False"}</p>
      </div>

      <button onClick={handleCreateUser}>Create Customer</button>
      {customers.map((customer, index) => (
        <p key={index}>{customer}</p>
      ))}
    </>
  );
}

export default App;
