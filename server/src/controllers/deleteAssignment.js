const pool = require("../../db");

async function deleteAssignmentController(req, res) {
  try {
    const { id } = req.params;
    console.log(req.params);
    const deleteAssignment = await pool.query(
      "DELETE FROM Assignments WHERE assignment_id = $1;",
      [id]
    );
    res.status(200);
    res.json({ message: "Assignment was deleted" });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { deleteAssignmentController }