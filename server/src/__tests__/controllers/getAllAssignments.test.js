const pool = require("../../../db");
const {
  getAllAssignmentsController,
} = require("../../controllers/getAllAssignments");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status code 200 when all assignments are returned", async () => {
  // Fake input data
  const fakeReq = {};

  // Fake response object
  const responseMock = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x),
  };

  // Fake result data
  fakeAssignments = [
    {
      assignment_id: 48,
      assignment_title: "subtraction",
      instructions: "use sub",
      due_date: "2024-03-13T07:00:00.000Z",
      is_published: false,
      class_id: 1,
    },
    {
      assignment_id: 49,
      assignment_title: "Adding",
      instructions: "use addition",
      due_date: "2024-03-13T07:00:00.000Z",
      is_published: false,
      class_id: 1,
    },
    {
      assignment_id: 50,
      assignment_title: "Multiplication",
      instructions: "mult",
      due_date: "2024-03-27T07:00:00.000Z",
      is_published: false,
      class_id: 1,
    },
  ];

  // Mocks for pool.query
  pool.query.mockImplementationOnce(() => ({
    rows: fakeAssignments,
  }));

  // Function call
  await getAllAssignmentsController(fakeReq, responseMock);

  // -- Assertions
  // pool.query should receive 1 call and have been called with a string selecting all from students
  expect(pool.query).toHaveBeenCalledWith("SELECT * FROM assignments");

  // responseMock.json should have received 1 call with fakeStudents
  expect(responseMock.json).toHaveBeenCalledWith(fakeAssignments);

  // responseMock.status should receive 1 call with 200 status code
  expect(responseMock.status).toHaveBeenCalledWith(200);
})
