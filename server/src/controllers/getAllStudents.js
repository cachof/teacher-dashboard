const pool = require("../../db");

async function getAllStudentsController(req, res) {
  try {
    const student = await pool.query("SELECT * FROM students");
    res.json(student.rows);
    res.status(200);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { getAllStudentsController };
