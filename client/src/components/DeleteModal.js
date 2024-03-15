/*
The DeleteModal component in React provides a modal window for confirming the deletion
of an assignment. It uses React Router hooks such as useParams, useNavigate, and useLocation
to extract information and handle navigation. The modal includes options to close it or
proceed with the deletion based on user confirmation.

- DeleteModal: React functional component for rendering a deletion confirmation modal.
  - Parameters:
    - target_id: The ID of the assignment to be deleted.
  - Hooks:
    - useParams: Retrieves parameters from the current URL.
    - useNavigate: Provides navigation capabilities.
    - useLocation: Retrieves information about the current URL.
  - Functions:
    - deleteAssignment: Initiates a DELETE request to delete the assignment with the specified ID.
  - JSX Elements:
    - Displays a modal with a confirmation message and options to Close or Delete.
*/

import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function DeleteModal({ target_id }) {
  const navigate = useNavigate();
  const location = useLocation();

  let { class_id } = useParams();
  const deleteAssignment = async (id) => {
    try {
      const deleteAssignment = await fetch(
        `http://localhost:5000/api/delete-assignment/${id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteAssignment.ok) {
        if (location.pathname == `/class/${class_id}/view-assignments`) {
          window.location.reload();
        } else {
          navigate(`/class/${class_id}/view-assignments`);
        }
      } else {
        console.error("Failed to delete student");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div className="modal" tabIndex="-1" id={`deleteModal-${target_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Assignment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to delete this assignment?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
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
