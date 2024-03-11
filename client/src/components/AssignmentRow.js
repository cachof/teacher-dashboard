import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import DeleteModal from "./DeleteModal";

function AssignmentRow({ assignment, refresh }) {
  const currentDate = new Date();

  let { class_id } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignment] = useState([]);

  function formatDate(date) {
    const parsedDueDate = new Date(date);
    return parsedDueDate.toLocaleDateString("en-US");
  }

  function getStatus(assignment) {
    const parsedDueDate = new Date(assignment.due_date);
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
          <Link
            to={{
              pathname: `/class/${assignment.class_id}/assignment/${assignment.assignment_id}/edit`,
            }}
          >
            <FaIcons.FaEdit />
          </Link>
        </td>
        <td>
          <FaIcons.FaTrash
            data-bs-toggle="modal"
            data-bs-target={`#deleteModal-${assignment.assignment_id}`}
          />
          <DeleteModal target_id={assignment.assignment_id} />
        </td>
      </tr>
    </>
  );
}

export default AssignmentRow;
