import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AssignmentTable from "../components/AssignmentTable";

function ViewAssignments() {
  const [assignments, setAssignments] = useState([]);

  let { class_id } = useParams();

  const getAssignments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/view-assignments");
      const jsonData = await response.json();
      console.log(jsonData);
      setAssignments(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

    useEffect(() => {
      getAssignments();
    }, []);

  return (
    <>
      <div id="published" className="w-75">
        <AssignmentTable assignments={assignments} />
      </div>
      <div id="drafts" className="w-75"></div>
    </>
  );
}

export default ViewAssignments;
