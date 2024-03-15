/*
createAssignment handles the creation of assignments in a database.
  - Extracts necessary data such as assignment title, instructions, due date,
    publication status, class ID, and a list of questions from the request body.
  - Inserts the assignment data into the database, retrieves the newly created
    assignment, and logs relevant information.
  - Proceeds to insert multiple questions associated with the assignment into
    the database.
  - Sends a response indicating the success of the operation along with the ID
    of the newly created assignment.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

const pool = require("../../db");

async function createAssignmentController(req, res) {
  try {
    console.log(req.body);

    const {
      assignment_title,
      instructions,
      due_date,
      is_published,
      class_id,
      questionsList,
    } = req.body;

    const assignmentQuery = await pool.query(
      "INSERT INTO Assignments (assignment_title, instructions, due_date, is_published, class_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [assignment_title, instructions, due_date, is_published, class_id]
    );
    console.log(assignmentQuery);

    const newAssignment = assignmentQuery.rows[0];

    console.log(newAssignment);
    // Insert multiple questions
    const insertQuestions = questionsList.map(async (question) => {
      await pool.query(
        "INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id) VALUES($1, $2, $3, $4)",
        [
          question.question_text,
          question.correct_answer,
          question.point_value,
          newAssignment.assignment_id,
        ]
      );
    });

    await Promise.all(insertQuestions);

    res.status(201);
    res.json({ id: newAssignment.assignment_id });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { createAssignmentController };
