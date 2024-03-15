const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { getStudentController } = require("./src/controllers/getStudent");
const {
  getAllStudentsController,
} = require("./src/controllers/getAllStudents");
const { createStudentController } = require("./src/controllers/createStudent");
const { deleteStudentController } = require("./src/controllers/deleteStudent");
const { getAssignmentController } = require("./src/controllers/getAssignment");
const {
  getAllAssignmentsController,
} = require("./src/controllers/getAllAssignments");
const {
  deleteAssignmentController,
} = require("./src/controllers/deleteAssignment");
const { createAssignmentController } = require("./src/controllers/createAssignment");
const { updateAssignmentController } = require("./src/controllers/updateAssignment");

// MIDDLEWARE //
app.use(cors());
app.use(express.json()); //req.body

// ROUTES //

// GET single student
app.get("/api/view-student/:id", getStudentController);

// GET all students
app.get("/api/view-classroom", getAllStudentsController);

// POST/Create student
app.post("/api/add-student", createStudentController);

// DELETE student
app.delete("/api/delete-student/:id", deleteStudentController);

// GET all assignments
app.get("/api/view-assignments", getAllAssignmentsController);

// GET one assignment
app.get("/api/view-assignment/:id", getAssignmentController);

// DELETE assignment
app.delete("/api/delete-assignment/:id", deleteAssignmentController);

// POST/Create assignment
app.post("/api/add-assignment", createAssignmentController);

//PUT/update an assignment
app.put("/api/update-assignment/:id", updateAssignmentController);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
