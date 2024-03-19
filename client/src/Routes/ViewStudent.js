/*
The ViewStudent component in React is designed to display detailed information
about a specific student within a classroom. It utilizes React hooks like useState,
useEffect, and useParams to manage state, handle side effects, and retrieve URL parameters.
The component fetches student data from the server using the "getStudent" function on
component mount. The displayed information includes the student's first and last name,
financial details, and a transaction history table. Users have the option to delete
the student by clicking the "Delete Student" button.

- ViewStudent: React functional component responsible for displaying detailed
  information about a specific student within a classroom.
  - State:
    - student: Holds an array of student data fetched from the server.
  - Hooks:
    - useEffect: Invokes the "getStudent" function when the component mounts, ensuring
      data retrieval.
  - Functions:
    - deleteStudent: Sends a DELETE request to the server to delete the student and
      navigates to the class page upon success.
    - getStudent: Asynchronously fetches student data from the server and updates
      the 'student' state.
  - Parameters:
    - None
  - JSX Elements:
    - Displays a table with detailed student information, including financial details
      and a transaction history.
    - Provides a button to delete the student, triggering the "deleteStudent" function.
*/

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewStudent() {
  const [student, setStudent] = useState([]);

  let { student_id } = useParams();
  let { class_id } = useParams();
  const navigate = useNavigate();

  const deleteStudent = async (id) => {
    try {
      const deleteStudent = await fetch(
        `http://localhost:5000/api/delete-student/${id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteStudent.ok) {
        console.log("Student deleted successfully");
        navigate(`/class/${class_id}`);
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getStudent = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-student/" + student_id
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setStudent(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <>
      <div className="w-75">
        <table className="table mx-5 text-center">
          <thead>
            <tr>
              <th>
                <h1 className="text-start">
                  {student.first_name} {student.last_name}
                </h1>
                <h2 className="text-start">RENT PAID</h2>
              </th>
              <th></th>
              <th>
                <h2>Total: $70</h2>
              </th>
            </tr>
          </thead>
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Account Activity</th>
              <th>$</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan 10, 2024</td>
              <td>Attendance 1/10/2024</td>
              <td>+ $5</td>
            </tr>
            <tr>
              <td>Jan 10, 2024</td>
              <td>Store Purchase</td>
              <td>- $12</td>
            </tr>
            <tr>
              <td>Jan 09, 2024</td>
              <td>Attendance 1/09/2024</td>
              <td>+ $5</td>
            </tr>
          </tbody>
        </table>
        <button
          className="btn btn-danger mt-1 px-3 float-end"
          onClick={() => deleteStudent(student_id)}
        >
          Delete Student
        </button>
      </div>
    </>
  );
}

export default ViewStudent;
