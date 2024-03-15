/*
The AssignmentRow component in React represents a row in a table displaying assignment
details. It utilizes React Router for navigation and React Icons (FontAwesome) for edit
and delete functionalities. The component provides links to view, edit, and delete
assignments, along with assignment title, status, due date, and action icons. Additionally,
it includes a DeleteModal component for confirming deletion.

- AssignmentRow: React functional component rendering a row in a table for displaying
  assignment details.
  - State:
    - assignments: Manages the state for assignment data (currently unused).
  - Hooks:
    - useState: Manages state variables.
    - useParams: Retrieves parameters from the current URL.
    - useNavigate: Provides programmatic navigation functionality.
  - Functions:
    - formatDate: Formats the due date of an assignment.
    - getStatus: Determines the status of an assignment (Past Due, Published, Draft).
  - Parameters:
    - assignment: Data representing the assignment for display.
    - refresh: Callback function for refreshing assignment data (currently unused).
  - JSX Elements:
    - Renders a table row with assignment details and action icons.
    - Provides links to view, edit, and delete assignments using React Router.
    - Utilizes FontAwesome icons for edit and delete actions.
    - Includes a DeleteModal for confirming assignment deletion.
*/

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
