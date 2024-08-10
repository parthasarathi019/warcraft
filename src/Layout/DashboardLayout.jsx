import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { AuthContext } from "../Contexts/AuthProvider";
import Login from "../Pages/Login/Login";
import DashboardResponsive from "../Dashboard/DashboardResponsive";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [usersData, setUserData] = useState([]);
  const [RoleModel, setRoleModel] = useState(false);

  useEffect(() => {
    setRoleModel(usersData[0]?.role === "admin");
  }, [usersData]);

  useEffect(() => {
    fetch(`https://invest-backend-inky.vercel.app/users/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [user]);
  console.log(user);
  return (
    <>
      {RoleModel ? (
        <div>
          <DashboardResponsive></DashboardResponsive>
        </div>
      ) : (
        <div>
          <Login></Login>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
