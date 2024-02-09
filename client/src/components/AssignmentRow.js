import React from "react";

function AssignmentRow({ assignment }) {
  // create function for line 13 that determines if assignment is
  // past due
  // if due_date < current_date,
  // then
  return (
    <>
      <tr key={assignment.assignment_id}>
        <td>{assignment.assignment_title}</td>
        <td>{assignment.is_published ? "Published" : "In Progress"}</td>
        <td>{assignment.due_date}</td>
      </tr>
    </>
  );
}

export default AssignmentRow;
