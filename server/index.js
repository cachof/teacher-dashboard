const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE //
app.use(cors());
app.use(express.json()); //req.body

// ROUTES //

// GET single student
app.get("/api/view-student/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await pool.query(
            "SELECT * FROM students WHERE student_id = $1",
            [id]
        )
        res.json(student.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

// GET all student
app.get("/api/view-classroom", async (req, res) => {
    try {
        const student = await pool.query("SELECT * FROM students")
        res.json(student.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000")
});
