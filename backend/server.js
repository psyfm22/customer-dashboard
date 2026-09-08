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
    verified: Boolean
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
    const { username, gender, verified } = req.body;

    const customer = new Customer({
        username,
        gender,
        verified
    });

    await customer.save();

    res.json(customer);
});


//Tell the app to listen on port 
app.listen(port, () => {
    console.log("Server running on port 3000");
});