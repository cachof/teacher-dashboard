/*
- Verifies createStudentController functionality by simulating student creation.
- Checks if correct database queries are made and response matches
  expectations. Validates createStudentController behavior, ensuring
  accurate student creation and response.
*/

const pool = require("../../../db");
const { createStudentController } = require("../../controllers/createStudent");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status 201 when new student is created", async () => {
  // Relevant input data
  const addStudentRequest = {
    body: {
      first_name: "Jane",
      last_name: "Doe",
      dob: "01/01/2000",
      class_id: 1,
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  // Fake result data
  fakeNewStudent = {
    student_id: 2,
    ...addStudentRequest,
  };

  // Mock for pool.query
  pool.query.mockImplementationOnce(() => ({ rows: [fakeNewStudent] }));

  // Function call
  await createStudentController(addStudentRequest, responseMock);

  // Assertions
  // pool.query should receive 1 call with string and value "INSERT INTO students (first_name, last_name, dob, class_id) VALUES ($1, $2, $3, $4) RETURNING *",[first_name, last_name, dob, class_id]
  expect(pool.query).toHaveBeenCalledWith(
    "INSERT INTO students (first_name, last_name, dob, class_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      addStudentRequest.body.first_name,
      addStudentRequest.body.last_name,
      addStudentRequest.body.dob,
      addStudentRequest.body.class_id,
    ]
  );

  // responseMock.status should receive 1 call with 201 status code
  expect(responseMock.status).toHaveBeenCalledWith(201);
});
