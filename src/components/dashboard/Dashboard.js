import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useLoaderData, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import classes from "./Dashboard.module.css";
import UserNav from "../dashboard/UserNav";
import { getUser } from "../../api/api";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const res = useLoaderData();
  const user = res.data.user;
  const userRole = user.role;

  useEffect(() => {
    if (userRole === "admin") {
      navigate("/admin", { replace: true });
    }
  }, [userRole, navigate]);

  useEffect(() => {
    if (searchParams.get("success") === "true")
      dispatch(
        alertActions.setState({
          message: `Your payment was successful and your order has been placed successfully!\nIf your order is not displayed on your dashboard, please check back in some minutes.`,
          status: "success",
        })
      );
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(authActions.refreshUser({ user: user }));
  }, [user, dispatch]);

  return (
    <section className={classes.dashboard}>
      <UserNav />
      <Outlet />
    </section>
  );
};

export default Dashboard;

export const loader = () => {
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");
  return getUser(jwt);
};
