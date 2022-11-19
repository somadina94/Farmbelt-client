import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import classes from "./Cart.module.css";
import styles from "../UI/General.module.css";
import Backdrop from "../UI/Backdrop";
import { cartActions } from "../../store/cart-slice";
import { alertActions } from "../../store/alert-slice";
import CartItems from "./CartItems";
import { checkoutSession } from "../../api/api";
import CartForm from "./CartForm";
import LoadSpinner from "../UI/LoadSpinner";
import { spinnerActions } from "../../store/spinner-slice";

const CartModal = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [showOrderBtn, setShowOrderBtn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const showSpinner = useSelector((state) => state.spinner.showSpinner);
  const cartVisibility = useSelector((state) => state.cart.cartVisibility);
  const { jwt } = useCookies(["jwt"])[0];
  const totalAmount = `#${totalPrice.toFixed(2)}`;
  const cartContentLength = cart.length;

  useEffect(() => {
    if (cartContentLength > 0) {
      setShowOrderBtn(true);
    }
  }, [cartContentLength]);

  const hideCartHandler = () => {
    dispatch(cartActions.hideCart());
  };

  const showFormHandler = () => {
    setShowForm(true);
  };

  const orderCartHandler = async (address) => {
    dispatch(spinnerActions.showSpinner());
    const cartData = {
      totalPrice,
      products: cart,
      totalQuantity,
      address,
    };

    const resCheckout = await checkoutSession(cartData, jwt);

    if (resCheckout.status === "success") {
      dispatch(cartActions.clearCart());
      window.location.assign(resCheckout.session.url);
    } else {
      dispatch(
        alertActions.setState({ message: resCheckout.message, status: "error" })
      );
    }
    dispatch(spinnerActions.hideSpinner());
  };

  const cartClasses = cartVisibility
    ? `${classes.cart} ${styles.add}`
    : `${classes.cart} ${styles.remove}`;

  return (
    <div className={cartClasses}>
      {showSpinner && <LoadSpinner />}
      {!showOrderBtn && (
        <p className={classes.empty}>
          Your cart is empty. Please go ahead and add items to cart.
        </p>
      )}
      <ul>
        {cart.map((prod) => (
          <CartItems
            key={prod.id}
            name={prod.name}
            summedPrice={prod.summedPrice}
            quantity={prod.quantity}
            id={prod.id}
            price={prod.price}
          />
        ))}
      </ul>
      {showOrderBtn && (
        <div className={classes.total}>
          <span>Total amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      <div className={classes.actions}>
        <button onClick={hideCartHandler}>Close cart</button>
        {showOrderBtn && (
          <button type="button" onClick={showFormHandler}>
            Add Delivery Address
          </button>
        )}
      </div>
      <div className={classes.form}>
        {showForm && (
          <CartForm showForm={showForm} checkout={orderCartHandler} />
        )}
      </div>
    </div>
  );
};

const Cart = () => {
  const backdropEl = document.getElementById("backdrop-root");
  const overlayEl = document.getElementById("overlay-root");

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, backdropEl)}
      {ReactDOM.createPortal(<CartModal />, overlayEl)}
    </Fragment>
  );
};

export default Cart;
