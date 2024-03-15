/*
The Navbar component in React serves as the navigation bar with a collapsible sidebar.
It utilizes React icons (FaIcons and AiIcons) for menu bars, close icons, and other
navigation elements. The sidebar's visibility is toggled by clicking the menu bars.
The navigation bar includes links and icons corresponding to the items defined in
the SidebarData.

- Navbar: React functional component for rendering the navigation bar with a collapsible sidebar.
  - State:
    - sidebar: Manages the visibility of the sidebar (true or false).
  - Functions:
    - showSidebar: Toggles the visibility of the sidebar.
  - JSX Elements:
    - Displays a navigation bar with menu bars that trigger the sidebar.
    - Collapsible sidebar with close icon, links, and icons for each navigation item.
    - Utilizes SidebarData for defining the structure of the sidebar.
*/

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar}></FaIcons.FaBars>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icons}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
