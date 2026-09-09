import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("Male");
  const [verification, setVerification] = useState(true);
  const [searchUsername, setSearchUsername] = useState("");
  const [filter, setFilter] = useState("All");

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
    if (!username) {
      alert("Username is empty");
      return;
    }

    e.preventDefault();

    //Reset the Username
    setUsername("");

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
  }

  async function handleDeleteCustomer(id) {
    const response = await fetch(`http://localhost:3000/api/customers/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      setCustomers((c) => c.filter((c) => c._id !== id));
    }
  }

  function changeUsername(e) {
    setUsername(e.target.value);
  }

  function changeGender(e) {
    setGender(e.target.value);
  }
  function changeVerification(e) {
    //This needs to be don't as radio button values are strings
    setVerification(e.target.value === "true");
  }
  function changeFilter(e) {
    setFilter(e.target.value);
  }
  function changeSearchUsername(e) {
    setSearchUsername(e.target.value);
  }

  return (
    <div className="app">
      <h1 className="title">Customer Dashboard</h1>
      <h2 className="title">Create User</h2>
      <input
        className="username-input"
        type="text"
        placeholder="Username..."
        value={username}
        onChange={changeUsername}
      />
      <div className="option-panel">
        <h3>Gender</h3>
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
      <div className="option-panel">
        <h3>Verification</h3>
        <label>
          <input
            type="radio"
            name="verification"
            value="true"
            checked={verification === true}
            onChange={changeVerification}
          />
          True
        </label>
        <label>
          <input
            type="radio"
            name="verification"
            value="false"
            checked={verification === false}
            onChange={changeVerification}
          />
          False
        </label>
        <p>Current Selection: {verification ? "True" : "False"}</p>
      </div>
      <button className="create-button" onClick={handleCreateUser}>
        Create Customer
      </button>

      <h2 className="title">Search User</h2>

      <div className="option-panel">
        <h3>filters</h3>
        <label>
          <input
            type="radio"
            name="filter"
            value="All"
            checked={filter === "All"}
            onChange={changeFilter}
          />{" "}
          All
        </label>{" "}
        <label>
          <input
            type="radio"
            name="filter"
            value="Verified"
            checked={filter === "Verified"}
            onChange={changeFilter}
          />{" "}
        </label>{" "}
        Verified
      </div>

      <input
        className="username-input"
        type="text"
        placeholder="Enter Username..."
        value={searchUsername}
        onChange={changeSearchUsername}
      />

      {customers
        .filter(
          (c) =>
            c.username.toLowerCase().includes(searchUsername.toLowerCase()) &&
            (filter === "All" || c.verification === true),
        )
        .map((customer, index) => (
          <div key={customer._id} className="customer-card">
            <p>
              Username: {customer.username}, Gender: {customer.gender},
              Verified: {customer.verification ? "True" : "False"}
            </p>
            <button
              className="delete-button"
              onClick={() => handleDeleteCustomer(customer._id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default App;
