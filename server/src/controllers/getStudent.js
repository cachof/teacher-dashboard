/* 
getStudentController handles retrieving a specific student entry from the database.
  - Extracts the ID of the student to be retrieved from the request parameters.
  - Retrieves the student entry from the database based on the provided ID.
  - Sends a response containing the retrieved student entry.
  - Sets the response status to indicate successful retrieval.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

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
