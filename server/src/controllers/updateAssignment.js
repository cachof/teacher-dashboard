/* 
updateAssignmentController handles updating assignment details and associated questions in the database.
  - Extracts the ID of the assignment to be updated from the request parameters.
  - Processes the request body to identify changed assignment details and questions.
  - Updates the assignment details in the database based on the identified changes.
  - Inserts new questions into the database and updates existing ones as necessary.
  - Deletes any questions associated with the assignment that were not included in the update.
  - Sends a response indicating successful update.
  - Logs any errors that occur during the process.
  - Exported for use by other parts of the application.
*/

const pool = require("../../db");

async function updateAssignmentController(req, res) {
  try {
    const { id } = req.params;
    const changedAssignmentDetailsList = [];
    let changedQuestionsList = [];

    // Get details out of req.body
    for (const key in req.body) {
      if (key === "questionsList") {
        // If the key is 'questionsList', extract it into changedQuestionsList
        changedQuestionsList = req.body[key];
      } else if (req.body[key] !== null) {
        // For other keys with non-null values, add them to changeAssignmentDetails
        changedAssignmentDetailsList.push({ [key]: req.body[key] });
      }
    }

    const updateAssignment = changedAssignmentDetailsList.map(
      async (assignmentDetail) => {
        const key = Object.keys(assignmentDetail)[0];
        const value = assignmentDetail[key];

        await pool.query(
          `UPDATE Assignments SET ${key} = $1 WHERE assignment_id = $2`,
          [value, id]
        );
      }
    );
    await Promise.all(updateAssignment);

    const existingQuestionsIdList = [];

    // Get details out of changedQuestionsList
    for (const question in changedQuestionsList) {
      // // Move the changed details into the changedQuestionDetailsList

      // 1. get question_id from object
      const changedQuestionId = changedQuestionsList[question]["question_id"];

      // 2. if question_id is undefined, INSERY
      if (changedQuestionId == null) {
        const result = await pool.query(
          "INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id) VALUES($1, $2, $3, $4) RETURNING question_id",
          [
            changedQuestionsList[question].question_text,
            changedQuestionsList[question].correct_answer,
            changedQuestionsList[question].point_value,
            id,
          ]
        );
        existingQuestionsIdList.push(result.rows[0].question_id);
      } else {
        // List of existing question_id's
        existingQuestionsIdList.push(changedQuestionId);
        // 3. else, loop and UPDATE, where questionDetail != question_id
        for (const questionDetail in changedQuestionsList[question]) {
          {
            if (questionDetail != "question_id") {
              const key = questionDetail;
              const value = changedQuestionsList[question][questionDetail];
              await pool.query(
                `UPDATE Questions SET ${key} = $1 WHERE question_id = $2`,
                [value, changedQuestionId]
              );
            }
          }
        }
      }
    }

    const questionIdString = existingQuestionsIdList.join(", ");

    await pool.query(
      `DELETE from Questions WHERE assignment_id = $1 AND question_id not in (${existingQuestionsIdList.join(
        ", "
      )})`,
      [id]
    );
    res.json("assignment updated");
    res.status(201);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { updateAssignmentController };
