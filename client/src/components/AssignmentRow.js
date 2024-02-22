import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

function AssignmentRow({ assignment, refresh }) {
  const currentDate = new Date();

  let { class_id } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignment] = useState([]);

  const deleteAssignment = async (id) => {
    try {
      const deleteAssignment = await fetch(
        `http://localhost:5000/api/delete-assignment/${id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteAssignment.ok) {
        console.log("Assignment deleted successfully");
        setAssignment(
          assignments.filter((assignment) => assignment.assignment_id !== id)
        );
        refresh();
        // navigate(`/class/${class_id}/view-assignments`);
        // window.location.reload();
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  function formatDate(date) {
    const parsedDueDate = new Date(date);
    return parsedDueDate.toLocaleDateString("en-US");
  }

  function getStatus(assignment) {
    console.log(currentDate);
    const parsedDueDate = new Date(assignment.due_date);
    console.log(parsedDueDate);
    if (parsedDueDate < currentDate) {
      return "Past Due";
    } else if (parsedDueDate > currentDate && assignment.is_published) {
      return "Published";
    } else {
      return "Draft";
    }
  }

  return (
    <>
      <tr key={assignment.assignment_id}>
        <td>
          <Link
            to={{
              pathname: `/class/${assignment.class_id}/assignment/${assignment.assignment_id}`,
            }}
          >
            {assignment.assignment_title}
          </Link>
        </td>
        <td>{getStatus(assignment)}</td>
        <td>{formatDate(assignment.due_date)}</td>
        <td>
          <FaIcons.FaEdit />
        </td>
        <td>
          <FaIcons.FaTrash
            onClick={() => deleteAssignment(assignment.assignment_id)}
          />
        </td>
      </tr>
    </>
  );
}

export default AssignmentRow;
