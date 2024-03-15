/*
- Verifies updateAssignmentController functionality by updating assignment and 
  associated questions.
- Checks if correct database queries are made and response matches expectations.
  Validates updateAssignmentController behavior, ensuring accurate update of 
  assignment details and associated questions, and response.
*/

const pool = require("../../../db");

const {
  updateAssignmentController,
} = require("../../controllers/updateAssignment");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status 201 when assignment details are updated", async () => {
  //Relevant input data
  const updateAssignmentRequest = {
    params: { id: "1" },
    body: {
      assignment_title: "Updated Title",
      instructions: "Updated Instructions",
      due_date: "2024-03-30",
      is_published: true,
      class_id: "1",
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

  // Function Call
  await updateAssignmentController(updateAssignmentRequest, responseMock);

  // Assertions

  expect(pool.query).toHaveBeenNthCalledWith(
    1,
    `UPDATE Assignments SET assignment_title = $1 WHERE assignment_id = $2`,
    [
      updateAssignmentRequest.body.assignment_title,
      updateAssignmentRequest.params.id,
    ]
  );

  expect(pool.query).toHaveBeenNthCalledWith(
    2,
    `UPDATE Assignments SET instructions = $1 WHERE assignment_id = $2`,
    [
      updateAssignmentRequest.body.instructions,
      updateAssignmentRequest.params.id,
    ]
  );

  expect(pool.query).toHaveBeenNthCalledWith(
    3,
    `UPDATE Assignments SET due_date = $1 WHERE assignment_id = $2`,
    [updateAssignmentRequest.body.due_date, updateAssignmentRequest.params.id]
  );

  expect(pool.query).toHaveBeenNthCalledWith(
    4,
    `UPDATE Assignments SET is_published = $1 WHERE assignment_id = $2`,
    [
      updateAssignmentRequest.body.is_published,
      updateAssignmentRequest.params.id,
    ]
  );

  expect(pool.query).toHaveBeenNthCalledWith(
    5,
    `UPDATE Assignments SET class_id = $1 WHERE assignment_id = $2`,
    [updateAssignmentRequest.body.class_id, updateAssignmentRequest.params.id]
  );

  expect(responseMock.json).toHaveBeenCalledWith("assignment updated");
  expect(responseMock.status).toHaveBeenCalledWith(201);
});

it("should send status 201 when questions details are updated", async () => {
  //Relevant input data
  const updateAssignmentRequest = {
    params: { id: "1" },
    body: {
      assignment_title: "Updated Title",
      instructions: "Updated Instructions",
      due_date: "2024-03-30",
      is_published: true,
      class_id: "1",
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

  // Function Call
  await updateAssignmentController(updateAssignmentRequest, responseMock);

  // Assertions

  expect(pool.query).toHaveBeenCalledWith(
    `UPDATE Questions SET question_text = $1 WHERE question_id = $2`,
    [
      updateAssignmentRequest.body.questionsList[0].question_text,
      updateAssignmentRequest.body.questionsList[0].question_id,
    ]
  );

  expect(pool.query).toHaveBeenCalledWith(
    `UPDATE Questions SET correct_answer = $1 WHERE question_id = $2`,
    [
      updateAssignmentRequest.body.questionsList[0].correct_answer,
      updateAssignmentRequest.body.questionsList[0].question_id,
    ]
  );

  expect(pool.query).toHaveBeenCalledWith(
    `UPDATE Questions SET point_value = $1 WHERE question_id = $2`,
    [
      updateAssignmentRequest.body.questionsList[0].point_value,
      updateAssignmentRequest.body.questionsList[0].question_id,
    ]
  );

  expect(responseMock.json).toHaveBeenCalledWith("assignment updated");
  expect(responseMock.status).toHaveBeenCalledWith(201);
});

it("should send status 201 when new question is inserted", async () => {
  //Relevant input data
  const updateAssignmentRequest = {
    params: { id: "1" },
    body: {
      assignment_title: "Updated Title",
      instructions: "Updated Instructions",
      due_date: "2024-03-30",
      is_published: true,
      class_id: "1",
      questionsList: [
        {
          question_id: null,
          question_text: "New Question",
          correct_answer: "New Answer",
          point_value: "10",
        },
      ],
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  const fakeInsertedQuestion = [
    {
      question_id: 1,
      question_text: "New Question",
      correct_answer: "New Answer",
      point_value: "10",
    },
  ];

  // Mock pool.query
  pool.query.mockReturnValue({
    rows: fakeInsertedQuestion,
  });

  // Function Call
  await updateAssignmentController(updateAssignmentRequest, responseMock);

  // Assertions

  expect(pool.query).toHaveBeenCalledWith(
    `INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id) VALUES($1, $2, $3, $4) RETURNING question_id`,
    [
      updateAssignmentRequest.body.questionsList[0].question_text,
      updateAssignmentRequest.body.questionsList[0].correct_answer,
      updateAssignmentRequest.body.questionsList[0].point_value,
      updateAssignmentRequest.params.id,
    ]
  );

  expect(responseMock.json).toHaveBeenCalledWith("assignment updated");
  expect(responseMock.status).toHaveBeenCalledWith(201);
});

it("should send status 201 when a question is deleted", async () => {
  //Relevant input data
  const updateAssignmentRequest = {
    params: { id: "1" },
    body: {
      assignment_title: "Updated Title",
      instructions: "Updated Instructions",
      due_date: "2024-03-30",
      is_published: true,
      class_id: "1",
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

  // Function Call
  await updateAssignmentController(updateAssignmentRequest, responseMock);

  // Assertions

  expect(pool.query).toHaveBeenCalledWith(
    `DELETE from Questions WHERE assignment_id = $1 AND question_id not in (${[
      updateAssignmentRequest.body.questionsList[0].question_id,
    ].join(", ")})`,
    [updateAssignmentRequest.params.id]
  );

  expect(responseMock.json).toHaveBeenCalledWith("assignment updated");
  expect(responseMock.status).toHaveBeenCalledWith(201);
});
