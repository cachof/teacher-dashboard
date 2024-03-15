/*
- Verifies getStudentController functionality by retrieving a student.
- Checks if correct database query is made and response matches expectations.
  Validates getStudentController behavior, ensuring accurate retrieval
  of student details and response.
*/

const pool = require("../../../db");
const { getStudentController } = require("../../controllers/getStudent");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status code of 200 when student is returned", async () => {
  // Relevant input data
  // This data is formatted to match the `req` object
  const studentRequest = {
    params: {
      id: 123,
    },
  };

  // Response mock
  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  // Fake result data
  fakeStudent = {
    id: 123,
    first_name: "Jane",
    last_name: "Doe",
    dob: "01/01/2000",
    class_id: 456,
  };

  // Mocks for pool.query
  // Returns an object with attribute `rows` set to an array with a single value - the student
  pool.query.mockImplementationOnce(() => ({
    rows: [fakeStudent],
  }));

  // Function call
  await getStudentController(studentRequest, responseMock);

  // Assertions
  // pool.query should
  //   - receive 1 call
  //   - first param should be a string targeting students table
  //   - second param should be an array with the submitted student id
  expect(pool.query).toHaveBeenCalledWith(
    expect.stringContaining("FROM students"),
    [studentRequest.params.id]
  );
  // responseMock.json should
  //   - receive 1 call
  //   - with the fakeStudent
  expect(responseMock.json).toHaveBeenCalledWith(fakeStudent);
  // responseMock.status should
  //   - receive 1 call
  //   - with 200 status code
  expect(responseMock.status).toHaveBeenCalledWith(200);
});
