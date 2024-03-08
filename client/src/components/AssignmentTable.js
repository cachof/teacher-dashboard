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
