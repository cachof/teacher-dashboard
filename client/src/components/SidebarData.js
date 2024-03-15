/*
The SidebarData constant in React provides an array of objects, each representing a
navigation link in the sidebar. Each object has properties for the link title, path,
associated icon, and a custom class name for styling.
*/

import React from 'react';
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "View Class",
    path: "/class/1",
    icons: <FaIcons.FaUserFriends />,
    cName: "nav-text",
  },
  {
    title: "Add Student",
    path: "/class/1/student/add",
    icons: <FaIcons.FaUserPlus />,
    cName: "nav-text",
  },
  {
    title: "Assignments",
    path: "/class/1/view-assignments",
    icons: <FaIcons.FaFileArchive />,
    cName: "nav-text",
  },
  {
    title: "Add Assignment",
    path: "/class/1/assignment/add",
    icons: <FaIcons.FaPlusSquare />,
    cName: "nav-text",
  },
];