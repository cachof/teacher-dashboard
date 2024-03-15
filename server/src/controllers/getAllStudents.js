/* 
getAllStudentsController handles retrieving all student entries from the database.
  - Retrieves all student entries from the database.
  - Sends a response containing the retrieved student entries.
  - Sets the response status to indicate successful retrieval.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

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
