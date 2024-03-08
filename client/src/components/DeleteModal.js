import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

function DeleteModal({ target_id }) {
const navigate = useNavigate();
const location = useLocation();

let { class_id } = useParams();
  const deleteAssignment = async (id) => {
    console.log("------ In delete -----")
    try {
      const deleteAssignment = await fetch(
        `http://localhost:5000/api/delete-assignment/${id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteAssignment.ok) {
        console.log("Assignment deleted successfully");
        if (location.pathname == `/class/${class_id}/view-assignments`) {
            window.location.reload();
        } else {navigate(`/class/${class_id}/view-assignments`);}
          // setAssignment(
          //   assignments.filter((assignment) => assignment.assignment_id !== id)
          // );
          // refresh();
        //   navigate(`/class/${class_id}/view-assignments`);
        // window.location.reload();
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      {/* <button
        type="button"
        class="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Delete
      </button> */}

      <div class="modal" tabindex="-1" id="deleteModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Delete Assignment</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this assignment?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => deleteAssignment(target_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
