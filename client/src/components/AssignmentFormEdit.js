/*
The AssignmentFormEdit component in React manages a form for editing assignments in a
specific classroom. It incorporates React hooks like useState, useEffect, and useRef for
state management and drag-and-drop functionality. Users can modify assignment details,
including title, instructions, due date, and associated questions. The form supports
drag-and-drop reordering of questions and allows toggling between draft and published
status. Additionally, it provides options for saving changes and deleting the assignment.

- AssignmentFormEdit: A React functional component handling the form for editing
  assignments in a classroom.
  - State:
    - assignment: Manages details like title, instructions, due date, and published status.
    - questionsList: Maintains a list of questions associated with the assignment.
    - isPublished: Represents the published status of the assignment.
  - Hooks:
    - useState: Manages state variables for assignment, question details, and published status.
    - useEffect: Updates state variables based on changes in assignmentData and questionsData.
    - useRef: Facilitates drag-and-drop functionality for reordering questions.
  - Functions:
    - handleAssignmentAdd: Updates the 'assignment' state based on user input for assignment details.
    - handleQuestionAdd: Adds a new question to the 'questionsList' state.
    - handleQuestionChange: Updates question details in the 'questionsList' state.
    - handleQuestionDelete: Removes a question from the 'questionsList' state.
    - handleSort: Reorders questions during drag-and-drop.
    - handleStatusChange: Toggles between draft and published status.
    - onSubmitWrapper: Prepares the body and triggers the onSubmit function.
  - Parameters:
    - assignmentData: Data for pre-populating assignment fields during editing.
    - questionsData: Data for pre-populating question fields during editing.
    - onSubmit: Callback function for handling form submission.
  - JSX Elements:
    - Renders a form with fields for editing assignment details and a dynamic list of questions.
    - Implements drag-and-drop for question reordering.
    - Allows toggling between draft and published status.
    - Provides buttons for saving changes and deleting the assignment.
*/
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DeleteModal from "./DeleteModal";

function AssignmentFormEdit({ assignmentData, questionsData, onSubmit }) {
  // handle drag
  const dragQuestion = useRef(0);
  const draggedOverQuestion = useRef(0);

  const handleSort = () => {
    const questionClone = [...questionsList];
    const temp = questionClone[dragQuestion.current];
    questionClone[dragQuestion.current] =
      questionClone[draggedOverQuestion.current];
    questionClone[draggedOverQuestion.current] = temp;
    setQuestionsList(questionClone);
  };

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

  useEffect(() => {
    setAssignment(assignmentData);
  }, [assignmentData]);

  const { assignment_title, instructions, is_published, due_date } = assignment;

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
    question_id: questionsData.question_id,
    question_text: "",
    correct_answer: "",
    point_value: 0,
  };

  //setQuestionsList
  const [questionsList, setQuestionsList] = useState([initialQuestion]);
  useEffect(() => {
    setQuestionsList(questionsData);
  }, [questionsData]);

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

  // what to do when question is deleted
  const handleQuestionDelete = (e, index) => {
    e.preventDefault();
    const list = [...questionsList];
    list.splice(index, 1);
    setQuestionsList(list);
  };

  // what to do when toggling between published and draft
  const [isPublished, setIsPublished] = useState(false);
  useEffect(() => {
    setIsPublished(assignmentData.is_published);
  }, [assignmentData]);
  const handleStatusChange = () => {
    const updatedIsPublished = !isPublished;
    setIsPublished(updatedIsPublished);
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      is_published: updatedIsPublished,
    }));
  };

  const onSubmitWrapper = (e) => {
    const body = {
      assignment_title,
      instructions,
      due_date,
      is_published,
      class_id,
      questionsList: questionsList.map((question, index) => ({
        ...question,
        question_id: questionsData[index]
          ? questionsData[index].question_id
          : null,
      })),
    };
    onSubmit(e, body);
  };

  return (
    <>
      <div className="w-75 m-5">
        <div className="form-check float-end d-inline">
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target={`#deleteModal-${assignment.assignment_id}`}
          >
            Delete
          </button>
          <DeleteModal target_id={assignment.assignment_id} />
        </div>

        <h1>
          {assignmentData == null && questionsData == null
            ? "Add New Assignment"
            : "Edit Assignment"}
        </h1>

        <form action="d-inline mt-5" onSubmit={onSubmitWrapper}>
          <div id="assignmentDetails">
            <div className="float-end d-inline">
              <div className="form-check float-end d-inline">
                <button type="submit" className="btn btn-primary mb-2">
                  Save
                </button>
              </div>

              <div className="form-check form-switch d-inline p-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={isPublished}
                  onChange={handleStatusChange}
                />
                <label
                  className="form-check-label"
                  for="flexSwitchCheckDefault"
                >
                  {isPublished ? "Published" : "Draft"}
                </label>
              </div>
            </div>

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
          </div>

          <div className="form-field pt-5">
            {questionsList.map((singleQuestion, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => (dragQuestion.current = index)}
                onDragEnter={() => (draggedOverQuestion.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                <button className="btn btn-warning mt-4">Click to Drag</button>
                <div className="first-division">
                  <input
                    type="text"
                    className="form-control mt-0"
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
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      name="point_value"
                      value={singleQuestion.point_value}
                      onChange={(e) => handleQuestionChange(e, index)}
                      id="floatingInputValue"
                      placeholder="Point Value"
                    />
                    <label for="floatingInputValue">Point Value:</label>
                  </div>
                  {questionsList.length > 1 && (
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleQuestionDelete(e, index)}
                    >
                      Delete Question
                    </button>
                  )}
                  {questionsList.length - 1 == index && (
                    <button
                      type="button"
                      className="btn btn-secondary mt-3 w-100"
                      onClick={handleQuestionAdd}
                    >
                      Add Question
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}

export default AssignmentFormEdit;
