const pool = require("../../../db");

const {
  updateAssignmentController,
} = require("../../controllers/updateAssignment");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status 201 when assignment is updated", async () => {
  //Relevant input data
  const updateAssignmentRequest = {
    params: { id: "1" },
    body: {
      assignment_title: "Updated Title",
      instructions: "Updated Instructions",
      questionsList: [
        {
          question_id: "1",
          question_text: "Updated Question 1",
          correct_answer: "Updated Answer 1",
          point_value: "10",
        },
      ],
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  // Fake result data
  const fakeUpdatedAssignment = {
    assignment_title: "Updated Title",
    instructions: "Updated Instructions",
    due_date: "2024-03-30",
    is_published: true,
    class_id: "1",
  };
  const fakeUpdatedQuestions = {
    question_id: "1",
    question_text: "Updated Question 1",
    correct_answer: "Updated Answer 1",
    point_value: "10",
  };

  // Mock pool.query to return data for assignment details and questions
  

  // Run the updateAssignmentController function
  await updateAssignmentController(updateAssignmentRequest, responseMock);

  // Assertions

  expect(pool.query).toHaveBeenNthCalledWith(
    1,
    `UPDATE Assignments SET assignment_title = $1 WHERE assignment_id = $3`,
    [updateAssignmentRequest.body.assignment_title, updateAssignmentRequest.body.instructions, updateAssignmentRequest.params.id]
  );

  expect(pool.query).toHaveBeenNthCalledWith(
    1,
    `UPDATE Assignments SET assignment_instructions = $1 WHERE assignment_id = $3`,
    [
      updateAssignmentRequest.body.instructions,
      updateAssignmentRequest.params.id,
    ]
  );


  expect(pool.query).toHaveBeenCalledWith(
    `UPDATE Questions SET question_text = $1, correct_answer = $2, point_value = $3 WHERE question_id = $4`,
    ["Updated Question 1", "Updated Answer 1", "10", "1"]
  );

  expect(pool.query).toHaveBeenCalledWith(
    `DELETE from Questions WHERE assignment_id = $1 AND question_id not in ($2, $3)`,
    ["1", "1", "2"]
  );

  expect(res.json).toHaveBeenCalledWith("assignment updated");
  expect(res.status).toHaveBeenCalledWith(201);
});
