import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import { AuthContext } from "../Contexts/AuthProvider";

const DashboardResponsive = () => {
  const { user } = useContext(AuthContext);
  const [usersData, setUserData] = useState([]);
  const [RoleModel, setRoleModel] = useState(false);

  useEffect(() => {
    setRoleModel(usersData[0]?.role === "admin");
  }, [usersData]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DataHost}/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [user]);
  return (
    <div className="drawer lg:drawer-open max-w-[100vw]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content ">
        {/* <Dashboard></Dashboard> */}
        {/* Page content here */}
        <div className="navbar bg-base-300 lg:hidden justify-between">
          <Link to="/" className="shrink-0">
            <h2 className={`ml-2 text-2xl font-bold gradient-text`}>
              Dashboard
            </h2>
          </Link>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost hover:bg-inherit text-xl drawer-button"
          >
            <FaBars />
          </label>
        </div>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu p-4 w-80 h-full bg-base-300 text-base-content dashboard flex-nowrap overflow-auto">
          <div className="flex justify-between">
            <div className="flex items-center mb-6">
              <h2 className={`ml-2 text-2xl lg:ps-0 font-bold gradient-text`}>
                Dashboard
              </h2>
            </div>
          </div>
          <div className="flex gap-3 p-4 mb-4 bg-neutral/10 rounded-md">
            <div className="mask mask-squircle w-8 h-8">
              {/* admin photo */}
              <img src={user?.photoURL} />
            </div>
            <div>
              <h3 className="font-bold text-neutral"></h3>
              <p className="opacity-60 text-xs">admin</p>
            </div>
          </div>
          {/* Sidebar content here */}

          {RoleModel && (
            <>
              <li className="">
                <NavLink className='' to="/dashboard">Upload Product</NavLink>
              </li>

              <li className="mt-3">
                <NavLink to="/dashboard/orders">Order List</NavLink>
              </li>
              <li className="mt-3">
                <NavLink to="/dashboard/Product_Control">Product Control</NavLink>
              </li>
            </>
          )}

          <div className="divider" />

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {/* <li>
            <NavLink to="/instructors"></NavLink>
          </li>
          <li>
            <NavLink to="/classes"></NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default DashboardResponsive;
