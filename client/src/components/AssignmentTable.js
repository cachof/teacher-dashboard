import React from "react";
import AssignmentRow from "./AssignmentRow";

function AssignmentTable({ assignments }) {
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
            <AssignmentRow assignment={assignment} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AssignmentTable;
