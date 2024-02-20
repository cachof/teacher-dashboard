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

// GET all students
app.get("/api/view-classroom", async (req, res) => {
    try {
        const student = await pool.query("SELECT * FROM students")
        res.json(student.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// POST/Create student
app.post("/api/add-student", async(req, res) => {
    try {
        const { first_name, last_name, dob, class_id } = req.body;
        const newStudent = await pool.query(
          "INSERT INTO students (first_name, last_name, dob, class_id) VALUES ($1, $2, $3, $4) RETURNING *",
          [first_name, last_name, dob, class_id]
        );

        res.json(newStudent.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
})

// DELETE student
app.delete("/api/delete-student/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteStudent = await pool.query(
            "DELETE FROM students where student_id = $1",
            [id]
        );
        res.status(200).json({ message: "Student was deleted" });
    } catch (error) {
        console.error(error.message);
    }
})

// GET all assignments
app.get("/api/view-assignments", async (req, res) => {
    try {
        const assignment = await pool.query("SELECT * FROM assignments")
        res.json(assignment.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// GET one assignment
app.get("/api/view-assignment/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const questions = await pool.query("SELECT * FROM Questions WHERE assignment_id = $1",
        [id])
        const assignment = await pool.query(
          "SELECT * FROM assignments WHERE assignment_id = $1", [id]
        );
        const result = {
            assignment: assignment.rows[0], 
            questions: questions.rows,
        }

        res.json(result);
    } catch (error) {
        console.error(error.message);
    }
} )

// POST/Create student
app.post("/api/add-assignment", async(req, res) => {
    try {
        const { assignment_title, instructions, due_date, is_published } = req.body;
        const newAssignment = await pool.query(
          "INSERT INTO Assignments (assignment_title, instructions, due_date, is_published, class_id) VALUES ($1, $2, $3, $4, (SELECT class_id FROM Classes WHERE topic='Math') RETURNING *",
          [assignment_title, instructions, due_date, is_published]
        );

        res.json(newAssignment.rows[0]);
        
    } catch (error) {
        console.error(error.message);
    }
})

// DELETE assignment
app.delete("/api/delete-assignment/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteStudent = await pool.query(
            "DELETE FROM Assignments WHERE assignment_id = $1;",
            [id]
        );
        res.status(200).json({ message: "Assignment was deleted" });
    } catch (error) {
        console.error(error.message);
    }
})






app.listen(5000, () => {
    console.log("server has started on port 5000")
});
