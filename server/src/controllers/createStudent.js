const pool = require("../../db");

async function createStudentController(req, res) {
  try {
    const { first_name, last_name, dob, class_id } = req.body;
    const newStudent = await pool.query(
      "INSERT INTO students (first_name, last_name, dob, class_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, dob, class_id]
    );

    res.json(newStudent.rows[0]);
    res.status(201);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createStudentController };
