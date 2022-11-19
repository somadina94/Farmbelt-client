import { useSelector } from "react-redux";

import classes from "./Orders.module.css";
import Order from "./Order";

const Orders = () => {
  const orders = useSelector((state) => state.auth.user.orders);

  return (
    <section className={classes.orders}>
      {orders.map((data) => (
        <Order key={data._id} order={data} />
      ))}
    </section>
  );
};

export default Orders;
