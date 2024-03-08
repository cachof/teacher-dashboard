const pool = require("../../db");

async function getStudentController(req, res) {
  try {
    const { id } = req.params;
    const student = await pool.query(
      "SELECT * FROM students WHERE student_id = $1",
      [id]
    );
    res.json(student.rows[0]);
    res.status(200);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { getStudentController };
