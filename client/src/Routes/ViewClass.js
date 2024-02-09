import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewClass() {
  const [students, setStudents] = useState([]);

  // let urlParams = useParams();
  let { class_id } = useParams();
  // console.log(urlParams);

  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/view-classroom");
      const jsonData = await response.json();
      console.log(jsonData);
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
      <div className="w-75">
        <h1 className="mx-5">Classroom</h1>
        <table className="table mx-5 text-center">
          <thead className="thead-light">
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
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
                <td>$70</td>
                <td>Attendance 1/10/2024</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={`/class/${class_id}/student/add`}>
          <button className="btn btn-success mt-1 px-3 float-right">
            Add Student
          </button>
        </Link>
      </div>
    </>
  );
}

export default ViewClass;

