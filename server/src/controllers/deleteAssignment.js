/* 
deleteAssignmentController handles the deletion of assignment entries from the database.
  - Extracts the ID of the assignment to be deleted from the request parameters.
  - Deletes the assignment entry from the database based on the provided ID.
  - Sends a response indicating successful deletion.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

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
}

module.exports = { deleteAssignmentController };
