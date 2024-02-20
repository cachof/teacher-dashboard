import React from "react";

function AddAssignment() {
  return (
    <>
      <div className="w-75 m-5">
        <h1>Add New Assignment</h1>
        <div id="assignmentDetails">
          <form action="d-flex mt-5">
            <input
              type="text"
              className="form-control form-control-lg"
              name="first_name"
              // value={first_name}
              // onChange={handleInputChange}
              id="assignment_title"
              placeholder="TITLE"
            />
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Instructions"
            ></textarea>
          </form>
        </div>

        <div id="assignmentQuestions" className="pt-5">
          <form action="d-flex mt-5 inline">
            <input
              type="text"
              className="form-control"
              // name="first_name"
              // value={first_name}
              // onChange={handleInputChange}
              id="assignment_instructions"
              placeholder="Question"
            />
            <input
              type="text"
              className="form-control"
              // name="first_name"
              // value={first_name}
              // onChange={handleInputChange}
              id="assignment_instructions"
              placeholder="Answer"
            />
            <input
              type="text"
              className="form-control"
              // name="first_name"
              // value={first_name}
              // onChange={handleInputChange}
              id="assignment_instructions"
              placeholder="Value"
            />
          </form>
          <button className="btn btn-primary mt-5 w-100">Add Question</button>
        </div>
      </div>
    </>
  );
}

export default AddAssignment;
