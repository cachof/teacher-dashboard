import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import "./App.css";
import AddStudent from "./Routes/AddStudent.js";
import ViewClass from "./Routes/ViewClass.js";
// import Home from "./Routes/Home";
import Navbar from "./components/Navbar.js";
import ViewStudent from "./Routes/ViewStudent.js";
import ViewAssignments from "./Routes/ViewAssignments.js";
import AddAssignment from "./Routes/AddAssignment.js";
import ViewOneAssignment from "./Routes/ViewOneAssignment.js";
import EditAssignment from "./Routes/EditAssignment.js";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<ViewClass />} />
      <Route path="/class/:class_id" element={<ViewClass />} />
      <Route
        path="/class/:class_id/student/:student_id"
        element={<ViewStudent />}
      />
      <Route path="/class/:class_id/student/add" element={<AddStudent />} />;
      <Route
        path="/class/:class_id/view-assignments"
        element={<ViewAssignments />}
      />
      <Route
        path="/class/:class_id/assignment/:assignment_id"
        element={<ViewOneAssignment />}
      />
      <Route
        path="/class/:class_id/assignment/add"
        element={<AddAssignment />}
      />
      <Route
        path="/class/:class_id/assignment/:assignment_id/edit"
        element={<EditAssignment />}
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
