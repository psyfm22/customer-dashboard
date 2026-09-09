const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = 3000;


const app = express();

// Allow requests coming from the application running at this address
// to access this backend
app.use(cors({
    origin: "http://localhost:5173"
}));

// Connect to the database using the string generated on mongodb atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));
    
const customerSchema = new mongoose.Schema({
    username: String,
    gender: String,
    verification: Boolean
})

//This creates the mongoose model called book using the schema
const Customer = mongoose.model("Customer", customerSchema);


//This is middleware that tells Express how to handle json data sent in requests
// Means that it autonatically turns the json request body into a js object
app.use(express.json());

app.get("/api/customers", async (req, res) => {
    const customers = await Customer.find();

    res.json(customers); 
});


app.post("/api/customers", async (req, res) => {
    const { username, gender, verification } = req.body;


    console.log(verification)
    const customer = new Customer({
        username,
        gender,
        verification
    });

    await customer.save();

    res.json(customer);
});

/*
*/
app.delete("/api/customers/:id", async (req, res) => {
    const { id } = req.params;

    await Customer.findByIdAndDelete(id);

    res.json({
        message: "Customer deleted"
    });
});


//Tell the app to listen on port 
app.listen(port, () => {
    console.log("Server running on port 3000");
});