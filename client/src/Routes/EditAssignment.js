/*
The EditAssignment component in React facilitates the editing of assignment
details within a specific classroom. It uses React hooks like useState and useEffect
to manage state and handle side effects. The component fetches assignment and
question data from the server using the "getAssignmentAndQuestions" function when
it loads. Users can edit assignment details through a form, and updates are sent
to the server using the "onSubmitForm" function upon submission.

- EditAssignment: React functional component responsible for editing assignment
  details within a specific classroom.
  - State:
    - questions: Holds questions associated with the assignment.
    - assignment: Stores details of the assignment being edited.
  - Hooks:
    - useEffect: Triggers the "getAssignmentAndQuestions" function to retrieve
      assignment and question data when the component loads.
  - Functions:
    - getAssignmentAndQuestions: Fetches assignment and question data from the
      server, updates the state variables, and formats the due date.
    - onSubmitForm: Sends a PUT request to the server to update assignment details
      and navigates to the view assignment page upon success.
  - Parameters:
    - None
  - JSX Elements:
    - Renders the AssignmentFormEdit component, providing assignment and question
      data along with a callback function for form submission.
*/

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssignmentFormEdit from "../components/AssignmentFormEdit";

function EditAssignment() {
  const [questions, setQuestions] = useState([]);
  const [assignment, setAssignment] = useState({});
  let { assignment_id, class_id } = useParams();
  const navigate = useNavigate();
  const getAssignmentAndQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-assignment/" + assignment_id
      );
      const jsonData = await response.json();
      const formattedDueDate = jsonData.assignment.due_date
        ? new Date(jsonData.assignment.due_date).toISOString().split("T")[0]
        : "";

      const formattedAssignment = {
        ...jsonData.assignment,
        due_date: formattedDueDate,
      };
      setQuestions(jsonData.questions);
      setAssignment(formattedAssignment);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAssignmentAndQuestions();
  }, []);

  const onSubmitForm = async (e, body) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/update-assignment/" + assignment_id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        navigate(`/class/${class_id}/assignment/${assignment_id}`);
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <AssignmentFormEdit
        assignmentData={assignment}
        questionsData={questions}
        onSubmit={onSubmitForm}
      ></AssignmentFormEdit>
    </>
  );
}

export default EditAssignment;
