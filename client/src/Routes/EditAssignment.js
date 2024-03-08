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
      console.log(jsonData.assignment.due_date);
      // Format the due_date if it exists
      const formattedDueDate = jsonData.assignment.due_date
        ? new Date(jsonData.assignment.due_date).toISOString().split("T")[0]
        : "";

      // Update the assignment object with the formatted due_date
      const formattedAssignment = {
        ...jsonData.assignment,
        due_date: formattedDueDate,
      };
      setQuestions(jsonData.questions);
      setAssignment(formattedAssignment);
      console.log(assignment);
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
      console.log("--- sending Edit body ------")
      console.log(body);
      const response = await fetch(
        "http://localhost:5000/api/update-assignment/" + assignment_id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      
      console.log("sent!");
      console.log(response);
      if (response.ok) {
        console.log(response.body);
        console.log(response.body.id);
        // const responseData = await response.json();
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
