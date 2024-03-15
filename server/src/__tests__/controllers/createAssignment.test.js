/*
- Verifies createAssignmentController functionality by simulating assignment
  creation.
- Checks if correct database queries are made and response matches
  expectations. Validates createAssignmentController behavior, ensuring
  accurate assignment creation and response.
*/

const pool = require("../../../db");
const {
  createAssignmentController,
} = require("../../controllers/createAssignment");
createAssignmentController;

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status 201 when new assignment is created", async () => {
  // Relevant input data
  const addAssignmentRequest = {
    body: {
      assignment_title: "Fake Assignment",
      instructions: "Fake Instructions",
      due_date: "2024-03-30",
      is_published: true,
      class_id: "1",
      questionsList: [
        {
          question_text: "Fake question 1",
          correct_answer: "Fake Answer 1",
          point_value: "5",
        },
        {
          question_text: "Fake question 2",
          correct_answer: "Fake question 2",
          point_value: "5",
        },
        {
          question_text: "Fake question 3",
          correct_answer: "Fake answer 3",
          point_value: "5",
        },
      ],
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  // Fake result data
  fakeNewAssignment = {
    assignment_id: 2,
    assignment_title: "Fake Assignment",
    instructions: "Fake Instructions",
    due_date: "2024-03-30",
    is_published: true,
    class_id: "1",
  };

  // Mock for pool.query
  pool.query.mockReturnValueOnce({ rows: [fakeNewAssignment] });

  // Function call
  await createAssignmentController(addAssignmentRequest, responseMock);

  // Assertions
  expect(pool.query).toHaveBeenNthCalledWith(
    1,
    "INSERT INTO Assignments (assignment_title, instructions, due_date, is_published, class_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [
      addAssignmentRequest.body.assignment_title,
      addAssignmentRequest.body.instructions,
      addAssignmentRequest.body.due_date,
      addAssignmentRequest.body.is_published,
      addAssignmentRequest.body.class_id,
    ]
  );

  // Assuming questionsList is an array of questions
  addAssignmentRequest.body.questionsList.forEach((question, index) => {
    expect(pool.query).toHaveBeenNthCalledWith(
      index + 2,
      "INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id) VALUES($1, $2, $3, $4)",
      [
        question.question_text,
        question.correct_answer,
        question.point_value,
        fakeNewAssignment.assignment_id,
      ]
    );
  });

  // responseMock.status should receive 1 call with 201 status code
  expect(responseMock.status).toHaveBeenCalledWith(201);

  // responseMock.json should receive 1 call with the expected response
  expect(responseMock.json).toHaveBeenCalledWith({
    id: fakeNewAssignment.assignment_id,
  });
});
