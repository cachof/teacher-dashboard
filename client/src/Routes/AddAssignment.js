/*
The AddAssignment component in React is responsible for allowing users to add a new
assignment to a specific classroom. It uses React hooks like useNavigate and useParams
to manage navigation and retrieve URL parameters. The component provides a form
(AssignmentForm) for users to input assignment details. Upon form submission,
the "onSubmitForm" function sends a POST request to the server to add the new
assignment. If successful, the user is redirected to the view assignment page for
the newly added assignment.

- AddAssignment: React functional component facilitating the addition of a new
  assignment to a specific classroom.
  - Hooks:
    - useNavigate: Enables navigation within the React application.
    - useParams: Retrieves parameters from the URL.
  - Functions:
    - onSubmitForm: Handles form submission, sends a POST request to the server to
      add the new assignment, and redirects to the view assignment page upon success.
  - Parameters:
    - None
  - JSX Elements:
    - Renders the AssignmentForm component, providing a callback function for form submission.
*/

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssignmentForm from "../components/AssignmentForm";

function AddAssignment() {
  let { class_id } = useParams();

  const navigate = useNavigate();

  const onSubmitForm = async (e, body) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/add-assignment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        const responseData = await response.json();
        navigate(`/class/${class_id}/assignment/${responseData.id}`);
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <AssignmentForm onSubmit={onSubmitForm} />
    </>
  );
}

export default AddAssignment;
