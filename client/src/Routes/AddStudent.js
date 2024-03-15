/*
The React component AddStudent is designed to facilitate the addition of a new
student to a specific classroom. It uses React hooks such as useState to manage
the form state and captures user input for the student's first name, last name,
and date of birth. The form submission triggers the onSubmitForm function, which
sends a POST request to the server to add the new student. Upon successful
addition, the user is redirected to the view class page for the respective class.

- AddStudent: React functional component responsible for adding a new student to
  a specific classroom.
  - State:
    - student: Holds the form data for the new student (first name, last name,
      date of birth, and class ID).
  - Event Handlers:
    - handleInputChange: Updates the 'student' state based on user input in the
      form fields.
    - onSubmitForm: Sends a POST request to add the new student to the server,
      redirects to the view class page upon success.
  - Parameters:
    - None
  - JSX Elements:
    - Displays a form with input fields for first name, last name, and date of
      birth.
    - Captures user input and updates the 'student' state accordingly.
    - Submits the form data to the server using a POST request.
    - Redirects to the view class page for the respective class upon successful
      addition.
*/

import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddStudent() {
  let { class_id } = useParams();

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    class_id: class_id,
  });

  const { first_name, last_name, dob } = student;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { first_name, last_name, dob, class_id };
      const response = await fetch("http://localhost:5000/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        window.location = `/class/${class_id}`;
      } else {
        console.error("Failed to add student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="w-75 m-5">
        <h1>Add New Student</h1>
        <form action="d-flex mt-5" onSubmit={onSubmitForm}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              className="form-control"
              name="first_name"
              value={first_name}
              onChange={handleInputChange}
              id="first_name"
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              className="form-control"
              name="last_name"
              value={last_name}
              onChange={handleInputChange}
              id="last_name"
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              className="form-control"
              name="dob"
              value={dob}
              onChange={handleInputChange}
              id="dob"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
