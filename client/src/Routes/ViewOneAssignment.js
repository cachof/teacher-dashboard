/*
The React component ViewOneAssignment is designed to display details of a specific
assignment within a classroom. It utilizes React hooks such as useState and useEffect
to manage state and handle side effects. The component fetches assignment and
question data from the server through the "getAssignmentAndQuestions" function,
triggered on component mount. The fetched data includes assignment details, such as
title, instructions, and due date, along with associated questions. The page presents
this information, allowing users to view and edit the assignment.

- ViewOneAssignment: React functional component responsible for displaying details
  of a specific assignment within a classroom.
  - State:
    - questions: Holds an array of questions associated with the assignment.
    - assignment: Stores details of the specific assignment being viewed.
  - Hooks:
    - useEffect: Invokes the "getAssignmentAndQuestions" function when the component
      mounts, ensuring data retrieval.
  - Functions:
    - getAssignmentAndQuestions: Asynchronously fetches assignment and question data
      from the server and updates the respective state variables.
    - formatDate: Formats a given date object into a readable string.
  - Parameters:
    - None
  - JSX Elements:
    - Displays assignment details, including title, instructions, and due date.
    - Provides a button to navigate to the assignment editing page.
    - Renders a QuestionsTable component to display associated questions.
*/

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QuestionsTable from "../components/QuestionsTable";

function ViewOneAssignment() {
  const [questions, setQuestions] = useState([]);
  const [assignment, setAssignment] = useState({});
  let { assignment_id, class_id } = useParams();

  const getAssignmentAndQuestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-assignment/" + assignment_id
      );
      const jsonData = await response.json();
      setQuestions(jsonData.questions);
      setAssignment(jsonData.assignment);
    } catch (error) {
      console.error(error.message);
    }
  };

  function formatDate(date) {
    const parsedDueDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return parsedDueDate.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    getAssignmentAndQuestions();
  }, []);

  return (
    <>
      <div className="w-75">
        <div>
          <Link to={`/class/${class_id}/assignment/${assignment_id}/edit`}>
            <button className="btn btn-success mt-1 px-3 float-end">
              Edit
            </button>
          </Link>
        </div>
        <div className="mx-5">
          <h1>{assignment.assignment_title}</h1>
          <p>Instructions: {assignment.instructions}</p>
          <p>Due Date: {formatDate(assignment.due_date)}</p>
        </div>
        <div>
          <QuestionsTable questions={questions} />
        </div>
      </div>
    </>
  );
}

export default ViewOneAssignment;
