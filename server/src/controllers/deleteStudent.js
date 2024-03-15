/* 
deleteStudentController handles the deletion of student entries from the database.
  - Extracts the ID of the student to be deleted from the request parameters.
  - Deletes the student entry from the database based on the provided ID.
  - Sends a response indicating successful deletion.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

const pool = require("../../db");

async function deleteStudentController(req, res) {
  try {
    const { id } = req.params;
    const deleteStudent = await pool.query(
      "DELETE FROM students where student_id = $1",
      [id]
    );
    res.status(200);
    res.json({ message: "Student was deleted" });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { deleteStudentController };
