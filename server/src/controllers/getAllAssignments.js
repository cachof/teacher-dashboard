/* 
getAllAssignmentsController handles retrieving all assignment entries from the database.
  - Retrieves all assignment entries from the database.
  - Sends a response containing the retrieved assignment entries.
  - Sets the response status to indicate successful retrieval.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

const pool = require("../../db");

async function getAllAssignmentsController(req, res) {
  try {
    const assignment = await pool.query("SELECT * FROM assignments");
    res.json(assignment.rows);
    res.status(200);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { getAllAssignmentsController };
