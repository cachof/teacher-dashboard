import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import AddStudent from "./Routes/AddStudent.js";
import ViewClass from "./Routes/ViewClass.js";
import Home from "./Routes/Home";
import Navbar from "./components/Navbar.js";
import ViewStudent from "./Routes/ViewStudent.js";
import ViewAssignments from "./Routes/ViewAssignments.js";
import AddAssignment from "./Routes/AddAssignment.js";

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/class/:class_id/student/add" element={<AddStudent />} />;
      <Route path="/class/:class_id" element={<ViewClass />} />
      <Route
        path="/class/:class_id/student/:student_id"
        element={<ViewStudent />}
      />
      <Route path="/view-assignments" element={<ViewAssignments />} />
      <Route path="/add-assignment" element={<AddAssignment />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
