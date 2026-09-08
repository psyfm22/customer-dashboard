import React, { useState } from "react";

function App() {
  const [customers, setCustomers] = useState(["Jack", "John", "Harry"]);
  const [currentUsername, setCurrentUsername] = useState("");

  function changeUsername(e) {
    setCurrentUsername(e.target.value);
  }

  function createUser() {
    setCustomers((customers) => [...customers, currentUsername]);
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
      <button onClick={createUser}>Create Customer</button>
      {customers.map((customer, index) => (
        <p key={index}>{customer}</p>
      ))}
    </>
  );
}

export default App;
