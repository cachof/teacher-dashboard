import { set } from "mongoose";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddAssignment() {
  // get params
  let { class_id } = useParams();

  // setAssignment
  const [assignment, setAssignment] = useState({
    assignment_title: "",
    instructions: "",
    due_date: "",
    is_published: false,
    class_id: class_id,
  });

  // destructure assignment
  const { assignment_title, instructions, due_date } = assignment;
  // set values in form

  // what to do when assignment is added (save button)
  const handleAssignmentAdd = (e) => {
    const { name, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value,
    }));
  };

  // question template
  const initialQuestion = {
    question_text: "",
    correct_answer: "",
    point_value: 0,
  };

  //setQuestion
  const [question, setQuestion] = useState([initialQuestion]);
  //setQuestionsList
  const [questionsList, setQuestionsList] = useState([initialQuestion]);

  console.log(questionsList);

  // what to do when "Add Question" is clicked
  const handleQuestionAdd = (e) => {
    setQuestionsList([...questionsList, { ...initialQuestion }]);
  };

  // what to do when question details are changed
  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...questionsList];
    list[index][name] = value;
    setQuestionsList(list);
  };

  const handleQuestionDelete = (index) => {
    const list = [...questionsList];
    list.splice(index, 1);
    setQuestionsList(list);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("hi");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="w-75 m-5">
        <h1>Add New Assignment</h1>
        <div id="assignmentDetails">
          <form action="d-flex mt-5">
            <button type="submit" className="btn btn-primary float-right mb-2">
              Save
            </button>
            <input
              type="text"
              className="form-control form-control-lg"
              name="assignment_title"
              value={assignment_title}
              onChange={handleAssignmentAdd}
              id="assignment_title"
              placeholder="Assignment Title"
            />
            <textarea
              className="form-control"
              id="assignment_instructions"
              name="instructions"
              rows="3"
              value={instructions}
              onChange={handleAssignmentAdd}
              placeholder="Instructions"
            ></textarea>
            <div className="form-inline">
              <label>Due Date: </label>
              <input
                type="date"
                className="form-control"
                name="due_date"
                value={due_date}
                onChange={handleAssignmentAdd}
                placeholder="Due Date"
                id="due_date"
              />
            </div>
          </form>
        </div>

        <div className="form-field pt-5">
          <form action="d-flex mt-5 inline">
            {questionsList.map((singleQuestion, index) => (
              <div key={index}>
                <div className="first-division">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="question_text"
                    value={singleQuestion.question_text}
                    onChange={(e) => handleQuestionChange(e, index)}
                    id="question_text"
                    placeholder="Question"
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="correct_answer"
                    value={singleQuestion.correct_answer}
                    onChange={(e) => handleQuestionChange(e, index)}
                    id="correct_answer"
                    placeholder="Answer"
                  />
                  {/* <label>Point Value:</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="point_value"
                    value={singleQuestion.point_value}
                    onChange={(e) => handleQuestionChange(e, index)}
                    id="point_value"
                    placeholder="Point Value"
                  />
                  {questionsList.length > 1 && (
                    <button
                      className="btn"
                      onClick={() => handleQuestionDelete(index)}
                    >
                      Delete This Question
                    </button>
                  )}
                  {questionsList.length - 1 == index && (
                    <button
                      type="button"
                      className="btn add-btn mt-3 w-100"
                      onClick={handleQuestionAdd}
                    >
                      Add Question
                    </button>
                  )}
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </>
  );
}

export default AddAssignment;
