/*
- Verifies deleteAssignmentController functionality by simulating assignment deletion.
- Checks if correct database query is made and response matches expectations.
  Validates deleteAssignmentController behavior, ensuring accurate assignment deletion
  and response.
*/

const pool = require("../../../db");
const {
  deleteAssignmentController,
} = require("../../controllers/deleteAssignment");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status code of 200 when assignment is deleted", async () => {
  //Relevant input data
  const deleteAssignmentRequest = {
    params: {
      id: 58,
    },
  };

  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  await deleteAssignmentController(deleteAssignmentRequest, responseMock);

  // Assertions

  // pool.query assertion
  expect(pool.query).toHaveBeenCalledWith(
    "DELETE FROM Assignments WHERE assignment_id = $1;",
    [deleteAssignmentRequest.params.id]
  );

  // responseMock.status should receive 1 call with 200 status
  expect(responseMock.status).toHaveBeenCalledWith(200);
});
