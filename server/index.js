const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE //
app.use(cors());
app.use(express.json()); //req.body

// ROUTES //

// GET single student

app.listen(3000, () => {
    console.log("server has started on port 3000")
});
