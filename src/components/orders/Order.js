import { Link } from "react-router-dom";
import PrintInvoice from "./PrintInvoice";
import Item from "./Item";
import classes from "./Order.module.css";

const Order = (props) => {
  const { order } = props;

  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const totalPrice = `#${order.totalPrice.toFixed(2)}`;
  const deliveryName = order.address[0].fullname;

  return (
    <div className={classes.order}>
      <div className={classes.header}>
        <div className={classes.hContainer}>
          <div className={classes.title}>
            <h3>ORDER PLACED</h3>
            <p>{date}</p>
          </div>
          <div className={classes.title}>
            <h3>TOTAL</h3>
            <p>{totalPrice}</p>
          </div>
          <div className={classes.title}>
            <h3>SHIP TO</h3>
            <p>{deliveryName}</p>
          </div>
        </div>
        <div className={classes.hContainer2}>
          <div className={classes["title-flex"]}>
            <h3>ORDER #</h3>
            <p>{order._id}</p>
          </div>
          <div className={classes["title-link"]}>
            <Link
              className={classes.details}
              to={`/dashboard/orders/${order._id}`}
            >
              Order details
            </Link>
            <PrintInvoice order={order} />
          </div>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.items}>
          {order.products.map((prod) => (
            <Item key={prod.id} product={prod} />
          ))}
        </div>
        <div className={classes.actions}>
          <Link to={`/dashboard/orders/${order._id}`}>Track package</Link>
          {/* <Link to="/">Write a product review</Link> */}
          {/* <Link to="/">Return Items</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Order;
