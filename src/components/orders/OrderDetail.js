import Cookies from "universal-cookie";
import { useLoaderData } from "react-router-dom";

import { getOrder } from "../../api/api";
import classes from "./OrderDetail.module.css";
import Product from "./Product";

const OrderDetail = () => {
  const res = useLoaderData();
  const order = res.data.order;
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const deliveryDate =
    new Date(order.createdAt).getTime() + 1000 * 60 * 60 * 24 * 7;
  const delDateConverted = new Date(deliveryDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const status = Date.now() > deliveryDate ? "Delivered" : "Processing...";

  const address = order.address[0];
  const addressFormatted = `${address.home}, ${address.zipcode}, ${address.street}, ${address.city}, ${address.state}`;

  const totalPrice = `#${order.totalPrice}`;

  return (
    <div className={classes.details}>
      <div className={classes.container}>
        <div className={classes.detail}>
          <span>ORDER PLACED</span>
          <p>{date}</p>
        </div>
        <div className={classes.detail}>
          <span>TOTAL</span>
          <p>{totalPrice}</p>
        </div>
        <div className={classes.detail}>
          <span>ORDER #</span>
          <p>{order._id}</p>
        </div>
        <div className={classes.detail}>
          <span>Delivery date</span>
          <p>{delDateConverted}</p>
        </div>
      </div>
      <div className={classes.status}>
        <span>Status →</span>
        <p>{status}</p>
      </div>
      <div className={classes.receipient}>
        <div className={classes.address}>
          <span>Receipient →</span>
          <p>{address.fullname}</p>
        </div>
        <div className={classes.address}>
          <span>Address →</span>
          <p>{addressFormatted}</p>
        </div>
        <div className={classes.address}>
          <span>Phone line →</span>
          <p>{address.phoneLine}</p>
        </div>
      </div>
      <ul className={classes.products}>
        {order.products.map((prod) => (
          <Product key={prod.id} product={prod} />
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;

export const loader = ({ params }) => {
  const cookie = new Cookies();
  const jwt = cookie.get("jwt");

  return getOrder(params.orderId, jwt);
};
