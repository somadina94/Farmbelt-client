import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Item.module.css";
import { getOneProduct } from "../../api/api";

const Item = (props) => {
  const [showImage, setShowImage] = useState(false);
  const [photo, setPhoto] = useState("");
  const { product } = props;
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
    <div className={classes.product}>
      <div className={classes.image}>
        {showImage && <img src={photo} alt="finisher" />}
      </div>
      <div className={classes.description}>
        <Link to={`/product/id`}>{product.name}</Link>
        <h3>{price}</h3>
        <button>Buy it Again</button>
      </div>
    </div>
  );
};

export default Item;
