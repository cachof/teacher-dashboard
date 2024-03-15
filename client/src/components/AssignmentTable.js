/*
The AssignmentTable component in React is responsible for displaying a table of assignments
related to a specific class. It utilizes React Router for navigation and includes an
AssignmentRow component for rendering individual assignment details. The table provides
information such as assignment title, status, due date, and action icons for edit and delete.
Additionally, a button is available to add a new assignment.

- AssignmentTable: React functional component for rendering a table of assignments.
  - Parameters:
    - assignments: An array of assignment objects to be displayed.
    - refreshAssignments: Callback function for refreshing assignment data.
  - Hooks:
    - useParams: Retrieves parameters from the current URL.
  - JSX Elements:
    - Displays a table with columns for Assignment Title, Status, Due Date, and Action Icons.
    - Maps through the 'assignments' array to render individual AssignmentRow components.
    - Provides a button to add a new assignment, linked to the Add Assignment page.
*/

import React from "react";
import { Link, useParams } from "react-router-dom";

import AssignmentRow from "./AssignmentRow";

function AssignmentTable({ assignments, refreshAssignments }) {
  let { class_id } = useParams();
  return (
    <>
      <h1 className="mx-5">Assignments</h1>
      <table className="table mx-5 text-center">
        <thead className="thead-light">
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <AssignmentRow
              assignment={assignment}
              refresh={refreshAssignments}
            />
          ))}
        </tbody>
      </table>
      <Link to={`/class/${class_id}/assignment/add`}>
        <button className="btn btn-success mt-1 px-3 float-end">
          Add Assignment
        </button>
      </Link>
    </>
  );
}

export default AssignmentTable;
