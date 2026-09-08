import React, { useState } from "react";

function App() {
  const [customers, setCustomers] = useState(["Jack", "John", "Harry"]);

  return (
    <>
      <h1>Customer Dashboard</h1>
      {customers.map((customer, index) => (
        <p>{customer}</p>
      ))}
    </>
  );
}

export default App;
