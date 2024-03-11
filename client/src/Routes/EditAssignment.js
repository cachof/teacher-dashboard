/*
Page Summary:
The ViewOneAssignment component in React is designed to show specific details of
an assignment within a classroom. It uses React hooks like useState and useEffect
to handle data and side effects. The component fetches assignment and question
data from the server using the "getAssignmentAndQuestions" function when it loads.
The displayed information includes the assignment title, instructions, due date,
and associated questions. Users can also edit the assignment details.

Function Summary:
- ViewOneAssignment: React functional component responsible for showing details
  of a specific assignment within a classroom.
  - State:
    - questions: Holds questions linked to the assignment.
    - assignment: Stores details of the viewed assignment.
  - Hooks:
    - useEffect: Triggers the "getAssignmentAndQuestions" function to retrieve
      assignment and question data when the component loads.
  - Functions:
    - getAssignmentAndQuestions: Fetches assignment and question data from the
      server and updates the state variables.
    - formatDate: Converts a date object into a readable string.
  - Parameters:
    - None
  - JSX Elements:
    - Displays assignment details like title, instructions, and due date.
    - Provides a button to navigate to the assignment editing page.
    - Uses a QuestionsTable component to show associated questions.
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
