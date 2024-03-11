const pool = require("../../../db");
const { getAllStudentsController } = require("../../controllers/getAllStudents");

// Enable ability to mock DB calls
jest.mock("../../../db");

it("should send status code of 200 when all students are returned", async () => {
    // Fake input data 
    const fakeReq = {};

    // Fake response object
    const responseMock = {
      status: jest.fn((x) => x),
      json: jest.fn((x) => x),
    };

    // Fake result data 
    fakeStudents = [
      {
        id: 123,
        first_name: "Jane",
        last_name: "Doe",
        dob: "01/01/2000",
        class_id: 456,
      },
      {
        id: 124,
        first_name: "John",
        last_name: "Doe",
        dob: "01/02/2000",
        class_id: 456,
      },
      {
        id: 125,
        first_name: "Jenny",
        last_name: "Doe",
        dob: "01/03/2000",
        class_id: 456,
      },
    ];

    // Mocks for pool.query
    pool.query.mockImplementationOnce(() => ({
        rows: fakeStudents
    }))

    // Function call
    await getAllStudentsController(fakeReq, responseMock)

    // -- Assertions
    // pool.query should receive 1 call and have been called with a string selecting all from students
    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM students");

    // responseMock.json should have received 1 call with fakeStudents
    expect(responseMock.json).
    toHaveBeenCalledWith(fakeStudents)

    // responseMock.status should receive 1 call with 200 status code
    expect(responseMock.status).toHaveBeenCalledWith(200);
})