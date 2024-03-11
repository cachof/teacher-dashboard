const pool = require("../../db");

async function updateAssignmentController(req, res) {
  try {
    const { id } = req.params;
    const changedAssignmentDetailsList = [];
    let changedQuestionsList = [];
    console.log("---- req.body ----");
    console.log(req.body);

    // Get details out of req.body
    for (const key in req.body) {
      if (key === "questionsList") {
        // If the key is 'questionsList', extract it into changedQuestionsList
        console.log('----- key === "questionsList" -----');
        changedQuestionsList = req.body[key];
      } else if (req.body[key] !== null) {
        // For other keys with non-null values, add them to changeAssignmentDetails
        changedAssignmentDetailsList.push({ [key]: req.body[key] });
      }
    }

    console.log("---- changedAssignmentDetailsList ----");
    console.log(changedAssignmentDetailsList);
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

    console.log("---- changedQuestionsList ----");
    console.log(changedQuestionsList);

    const existingQuestionsIdList = [];

    // Get details out of changedQuestionsList
    for (const question in changedQuestionsList) {
      console.log("---- changedQuestionsList[question] ----");
      console.log(changedQuestionsList[question]);
      console.log("---- question ----");
      console.log(question);
      // // Move the changed details into the changedQuestionDetailsList
      // Dont think this is needed anymore.. const changedQuestionDetailsList = [];

      // 1. get question_id from object
      console.log("---- stuck here ----");
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
            console.log("---- questionDetail ----");
            console.log(questionDetail);
            if (questionDetail != "question_id") {
              const key = questionDetail;
              // console.log("----- key -----");
              // console.log(key);
              const value = changedQuestionsList[question][questionDetail];
              // console.log("----- value -----");
              // console.log(value);
              await pool.query(
                `UPDATE Questions SET ${key} = $1 WHERE question_id = $2`,
                [value, changedQuestionId]
              );
            }
          }
        }
      }

      // -------------------------------------------------------------------------------
    }

    const questionIdString = existingQuestionsIdList.join(", ");
    console.log("---- existingQuestionsIdList ------");
    console.log(existingQuestionsIdList);
    console.log("---- attempting to delete ------");
    await pool.query(
      `DELETE from Questions WHERE assignment_id = $1 AND question_id not in (${existingQuestionsIdList.join(
        ", "
      )})`,
      [id]
    );
    console.log("---- delete complete ------");
    res.json("assignment updated");
    res.status(201);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { updateAssignmentController };