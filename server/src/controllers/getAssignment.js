const pool = require("../../db");

async function getAssignmentController(req, res) {
  try {
    const { id } = req.params;
    const questions = await pool.query(
      "SELECT * FROM Questions WHERE assignment_id = $1",
      [id]
    );
    const assignment = await pool.query(
      "SELECT * FROM assignments WHERE assignment_id = $1",
      [id]
    );
    const result = {
      assignment: assignment.rows[0],
      questions: questions.rows,
    };
    res.json(result);
    res.status(200);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { getAssignmentController };
