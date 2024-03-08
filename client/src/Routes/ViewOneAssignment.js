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
            {/* <EditAssignment assignmentData = {assignment} questionData = {questions} */}
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
