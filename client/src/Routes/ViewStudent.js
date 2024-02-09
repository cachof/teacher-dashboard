import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ViewStudent() {
  const [student, setStudent] = useState([]);

  let { student_id } = useParams();
  let { class_id } = useParams();
  const navigate = useNavigate();

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(
        `http://localhost:5000/api/delete-student/${id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteTodo.ok) {
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
      <div class="w-75">
        <table class="table mx-5 text-center">
          <thead>
            <tr>
              <th>
                <h1 class="text-start">
                  {student.first_name} {student.last_name}
                </h1>
              </th>
              <th></th>
              <th>
                <h2>Total: $70</h2>
              </th>
            </tr>
          </thead>
          <thead class="thead-light">
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
          className="btn btn-danger mt-1 px-3 float-right"
          onClick={() => deleteTodo(student_id)}
        >
          Delete Student
        </button>
      </div>
    </>
  );
}

export default ViewStudent;
