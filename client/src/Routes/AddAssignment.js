import React, { useState } from "react";
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
