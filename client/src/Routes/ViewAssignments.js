/*
The React component ViewAssignments is responsible for displaying assignments,
utilizing the AssignmentTable component to render the assignments in a table format.
It fetches assignment data from the server through the getAssignments function,
which is triggered when the component mounts. The fetched data is stored in the
'assignments' state and passed as props to the AssignmentTable component. The page
features two sections, one for published assignments and another for drafts.

- ViewAssignments: React functional component rendering assignments in a table.
  - State:
    - assignments: Holds an array of assignment data fetched from the server.
  - Hooks:
    - useEffect: Invokes the "getAssignments" function when the component mounts.
  - Functions:
    - getAssignments: Asynchronously fetches assignment data from the server and
      updates the 'assignments' state.
  - JSX Elements:
    - Uses the AssignmentTable component to display published assignments.
    - Has two sections: one for published assignments and another for drafts.
*/

import React, { useEffect, useState } from "react";

import AssignmentTable from "../components/AssignmentTable";

function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);

  const getAssignments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/view-assignments"
      );
      const jsonData = await response.json();
      setAssignments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAssignments();
  }, []);

  return (
    <>
      <div id="published" className="w-75">
        <AssignmentTable
          assignments={assignments}
          refreshAssignments={getAssignments}
        />
      </div>
      <div id="drafts" className="w-75"></div>
    </>
  );
}

export default ViewAssignments;
