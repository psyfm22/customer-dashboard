import React, { useState, useEffect } from "react";

function App() {
  const [customers, setCustomers] = useState([]);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("Male");
  const [verification, setVerification] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
        console.log(data);
      });
  }, []);

  async function handleCreateUser(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        gender,
        verification,
      }),
    });

    //We await converting the response.json()
    const customer = await response.json();

    // setCustomers by just adding the new books
    setCustomers((c) => [...c, customer]);

    //Reset the Username
    setUsername("");
  }

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeGender(e) {
    setGender(e.target.value);
  }
  function changeVerifcation(e) {
    //This needs to be don't as radio button values are strings
    setVerification(e.target.value === "true");
  }
  return (
    <>
      <h1>Customer Dashboard</h1>
      <input
        type="text"
        placeholder="Username..."
        value={username}
        onChange={changeUsername}
      />

      <div>
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            checked={gender === "Male"}
            onChange={changeGender}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            checked={gender === "Female"}
            onChange={changeGender}
          />
          Female
        </label>
        <p>Current Selection: {gender}</p>
      </div>

      <div>
        <label>
          <input
            type="radio"
            name="verification"
            value="true"
            checked={verification === true}
            onChange={changeVerifcation}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="verification"
            value="false"
            checked={verification === false}
            onChange={changeVerifcation}
          />
          False
        </label>
        <p>Current Selection: {verification ? "True" : "False"}</p>
      </div>

      <button onClick={handleCreateUser}>Create Customer</button>
      {customers.map((customer, index) => (
        <p key={index}>{customer.username}</p>
      ))}
    </>
  );
}

export default App;
