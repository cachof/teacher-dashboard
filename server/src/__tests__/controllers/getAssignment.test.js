const { response } = require("express");
const pool = require("../../../db");
const { deleteStudentController } = require("../../controllers/deleteStudent");
const { getAssignmentController } = require("../../controllers/getAssignment");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status 200 when assignment with questions is returned", async () => {
  // Relevant input data
  const assignmentRequest = {
    params: {
      id: 38,
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  // Fake result data
  const fakeAssignment = {
    assignment_id: 38,
    assignment_title: "Addition",
    instructions: "Use addition",
    due_date: "2024-03-05T08:00:00.000Z",
    is_published: false,
    class_id: 1,
  };

  const fakeQuestions = [
    {
      question_id: 52,
      question_text: "4 + 4",
      correct_answer: "8",
      point_value: 5,
      assignment_id: 38,
    },
    {
      question_id: 47,
      question_text: "5+6",
      correct_answer: "11",
      point_value: 5,
      assignment_id: 38,
    },
    {
      question_id: 48,
      question_text: "3+3",
      correct_answer: "6",
      point_value: 5,
      assignment_id: 38,
    },
    {
      question_id: 57,
      question_text: "2+2",
      correct_answer: "4",
      point_value: 5,
      assignment_id: 38,
    },
  ];

  const fakeResult = {
    assignment: fakeAssignment,
    questions: fakeQuestions,
  };

  // Mocks for pool.query
  pool.query
    .mockReturnValueOnce({
      rows: fakeQuestions,
    })
    .mockReturnValueOnce({
      rows: [fakeAssignment],
    });

  await getAssignmentController(assignmentRequest, responseMock);

  // Assertions
  expect(pool.query).toHaveBeenNthCalledWith(
    1,
    "SELECT * FROM Questions WHERE assignment_id = $1",
    [assignmentRequest.params.id]
  );

  expect(pool.query).toHaveBeenNthCalledWith(
    2,
    "SELECT * FROM assignments WHERE assignment_id = $1",
    [assignmentRequest.params.id]
  );

  expect(responseMock.json).toHaveBeenCalledWith(fakeResult)

  expect(responseMock.status).toHaveBeenCalledWith(200);
});
