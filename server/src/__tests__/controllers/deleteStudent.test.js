/*
- Verifies deleteStudentController functionality by simulating student deletion.
- Checks if correct database query is made and response matches expectations.
  Validates deleteStudentController behavior, ensuring accurate student deletion
  and response.
*/

const pool = require("../../../db");
const { deleteStudentController } = require("../../controllers/deleteStudent");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status code of 200 when student is deleted", async () => {
  //Relevant input data
  const deleteStudentRequest = {
    params: {
      id: 123,
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  await deleteStudentController(deleteStudentRequest, responseMock);

  // Assertions

  // pool.query assertion
  expect(pool.query).toHaveBeenCalledWith(
    "DELETE FROM students where student_id = $1",
    [deleteStudentRequest.params.id]
  );

  // responseMock.status should receive 1 call with 200 status
  expect(responseMock.status).toHaveBeenCalledWith(200);
});
