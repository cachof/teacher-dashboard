const pool = require("../../db");

async function getAllAssignmentsController(req, res) {
  try {
    const assignment = await pool.query("SELECT * FROM assignments");
    res.json(assignment.rows);
    res.status(200);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getAllAssignmentsController }
