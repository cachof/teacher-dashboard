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
    // Prevents refresh
    e.preventDefault();
    try {
      const body = { first_name, last_name, dob, class_id };
      console.log(body);
      const response = await fetch("http://localhost:5000/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(student);
      // Check if the request was successful before redirecting

      // Notes for add assignment:
      // window.location = `/class/${class_id}/assignment/${response.data.id}`
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
