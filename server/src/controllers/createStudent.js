/* 
createStudentController handles the creation of student entries in a database.
  - Extracts necessary data such as first name, last name, date of birth, and class ID
    from the request body.
  - Inserts the student data into the database, including first name, last name, date
    of birth, and associated class ID.
  - Sends a response with the details of the newly created student entry.
  - Sets the response status to indicate successful creation.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application. 
*/

const pool = require("../../db");

async function createStudentController(req, res) {
  try {
    const { first_name, last_name, dob, class_id } = req.body;
    const newStudent = await pool.query(
      "INSERT INTO students (first_name, last_name, dob, class_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, dob, class_id]
    );
    res.json(newStudent.rows[0]);
    res.status(201);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createStudentController };
