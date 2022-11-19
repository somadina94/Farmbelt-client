import { Fragment, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/admin/Header";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user.role);
  useEffect(() => {
    if (userRole === "user") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate, userRole]);

  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default AdminLayout;
