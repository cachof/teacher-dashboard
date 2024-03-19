/*
This React component, named ViewClass, is responsible for displaying information
about students in a classroom. It utilizes React hooks such as useState and
useEffect to manage state and handle side effects. The component fetches student
data from the server using the "getStudents" function, which is triggered when
the component mounts. The fetched data is stored in the 'students' state, and the
information is then displayed in a table format. Each row in the table represents
a student, with details like student ID, name, rent status, cost, and the latest
account activity. Additionally, a button is provided to navigate to the "Add
Student" page for the specific class.

- ViewClass: React functional component responsible for rendering the student
  information in a classroom.
  - State:
    - students: Holds an array of student data fetched from the server.
  - Hooks:
    - useEffect: Invokes the "getStudents" function when the component mounts,
      ensuring data retrieval.
  - Functions:
    - getStudents: Asynchronously fetches student data from the server and
      updates the 'students' state.
  - Parameters:
    - None
  - JSX Elements:
    - Displays a table with columns for Student ID, Student Name, Rent, $, and
      Latest Account Activity.
    - Maps through the 'students' array to render individual rows for each
      student with their details.
    - Provides a button to navigate to the "Add Student" page for the specific
      class.
*/

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewClass() {
  const [students, setStudents] = useState([]);

  let { class_id } = useParams();

  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/view-classroom");
      const jsonData = await response.json();
      setStudents(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <>
      <div className="w-75 m-5">
        <h1 className="mx-5">Classroom</h1>
        <table className="table mx-5 text-center">
          <thead className="thead-light">
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Taxes</th>
              <th>Rent</th>
              <th>$</th>
              <th>Latest Account Activity</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>
                  <Link
                    to={`/class/${student.class_id}/student/${student.student_id}`}
                  >
                    {student.first_name} {student.last_name}
                  </Link>
                </td>
                <td>Yes</td>
                <td>Yes</td>
                <td>$70</td>
                <td>Attendance 1/10/2024</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/class/${class_id}/student/add`}>
          <button className="btn btn-success mt-1 px-3 float-end">
            Add Student
          </button>
        </Link>
      </div>
    </>
  );
}

export default ViewClass;
