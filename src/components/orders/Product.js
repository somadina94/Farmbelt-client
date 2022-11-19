import { useEffect, useState } from "react";

import classes from "./Product.module.css";
import { getOneProduct } from "../../api/api";

const Product = (props) => {
  const [showImage, setShowImage] = useState(false);
  const [photo, setPhoto] = useState("");
  const { product } = props;
  const quantity = `X${product.quantity}`;
  const price = `#${product.price.toFixed(2)}`;

  useEffect(() => {
    const sendRequest = async () => {
      const res = await getOneProduct(product.id);
      setPhoto(res.data.product.photo);
      setShowImage(true);
    };
    sendRequest();
  }, [product.id]);

  return (
    <li className={classes.products}>
      <div className={classes.image}>
        {showImage && <img src={photo} alt="product" />}
      </div>
      <div className={classes.detail}>
        <p>{product.name}</p>
        <p>{price}</p>
        <p>{quantity}</p>
      </div>
    </li>
  );
};

export default Product;
