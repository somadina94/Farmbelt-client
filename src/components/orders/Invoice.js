import { forwardRef } from "react";

import classes from "./Invoice.module.css";
import logo from "../../images/logo.png";
import InvoiceProdList from "./InvoiceProdList";

const Invoice = forwardRef((props, ref) => {
  const { order } = props;
  const totalQuantity = `X${order.totalQuantity}`;
  const totalPrice = `#${order.totalPrice.toFixed(2)}`;

  return (
    <div className={classes.invoice} ref={ref}>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.customer}>
        <span>Order #</span>
        <p>{order._id}</p>
      </div>
      <div className={classes.customer}>
        <span>Customer name</span>
        <p>{order.user.name}</p>
      </div>
      <ul className={classes.products}>
        {order.products.map((prod) => (
          <InvoiceProdList key={prod.id} product={prod} />
        ))}
      </ul>
      <div className={classes.detail}>
        <span>Total quantity</span>
        <p>{totalQuantity}</p>
      </div>
      <div className={classes.detail}>
        <span>Total price</span>
        <p>{totalPrice}</p>
      </div>
      <ul className={classes.terms}>
        <h3>Terms and conditions</h3>
        <li>No return of goods after purchase.</li>
        <li>No refund of payment after transaction has been completed.</li>
      </ul>
      <address>
        Farmbelt enterprices, No 30, Onuaguluchi's avenue achi, Oji-river L.G.A
        Enugu state.
      </address>
    </div>
  );
});

export default Invoice;
