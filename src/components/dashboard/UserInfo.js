import { useSelector } from "react-redux";

import classes from "./UserInfo.module.css";

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={classes.info}>
      <div className={classes.details}>
        <span>Fullname</span>
        <span>{user.name}</span>
      </div>
      <div className={classes.details}>
        <span>Email address</span>
        <span>{user.email}</span>
      </div>
      <div className={classes.details}>
        <span>Phone number</span>
        <span>{user.phone}</span>
      </div>
    </div>
  );
};

export default UserInfo;
