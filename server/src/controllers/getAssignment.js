/* 
getAssignmentController handles retrieving a specific assignment entry from the database.
  - Extracts the ID of the assignment to be retrieved from the request parameters.
  - Retrieves the assignment entry from the database based on the provided ID.
  - Retrieves all questions associated with the assignment from the database.
  - Constructs a response object containing details of the assignment and its associated questions.
  - Sends a response containing the constructed result.
  - Sets the response status to indicate successful retrieval.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

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
