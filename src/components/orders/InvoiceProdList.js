import classes from "./InvoiceProdList.module.css";

const InvoiceProdList = (props) => {
  const { product } = props;
  const price = `#${product.price.toFixed(2)}`;
  const quantity = `X${product.quantity}`;

  return (
    <li className={classes.product}>
      <div className={classes.detail}>
        <span>product</span>
        <p>{product.name}</p>
      </div>
      <div className={classes.detail}>
        <span>Price</span>
        <p>{price}</p>
      </div>
      <div className={classes.detail}>
        <span>Quantity</span>
        <p>{quantity}</p>
      </div>
    </li>
  );
};

export default InvoiceProdList;
