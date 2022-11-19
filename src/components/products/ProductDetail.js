import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import Transition from "react-transition-group/Transition";

import classes from "./ProductDetail.module.css";
import { getOneProduct } from "../../api/api";
import Review from "./Review";
import { cartActions } from "../../store/cart-slice";
import ReviewForm from "./ReviewForm";

const ProductDetail = () => {
  const [showReviews, setShowReviews] = useState(false);
  const [showRevForm, setShowRevForm] = useState(false);
  const dispatch = useDispatch();
  const res = useLoaderData();
  const product = res.data.product;
  const price = `#${product.price}`;
  const length = product.reviews.length;
  const photos = product.photos;

  useEffect(() => {
    if (length > 0) {
      setShowReviews(true);
    }
  }, [length]);

  const addToCartHandler = () => {
    dispatch(
      cartActions.add({
        id: product._id,
        price: product.price,
        quantity: 1,
        name: product.name,
      })
    );
  };

  const showRevFormHandler = () => {
    setShowRevForm((prevState) => !prevState);
  };

  return (
    <section className={classes.product}>
      <button type="button" onClick={addToCartHandler}>
        Add to Cart
      </button>
      <div className={classes.details}>
        <div className={classes.detail}>
          <span>Name</span>
          <span>{product.name}</span>
        </div>
        <div className={classes.detail}>
          <span>Price</span>
          <span>{price}</span>
        </div>
        <ul className={classes.images}>
          {photos.map((photo) => (
            <li className={classes.image}>
              <img src={photo} alt="layer" />
            </li>
          ))}
        </ul>
        <div className={classes.detail}>
          <span>Description</span>
          <p className={classes.desc}>{product.description}</p>
        </div>
      </div>
      {showReviews && (
        <div className={classes.reviews}>
          {product.reviews.map((rev) => (
            <Review
              key={rev._id}
              id={rev._id}
              name={rev.user.name}
              review={rev.review}
              rating={rev.rating}
            />
          ))}
        </div>
      )}
      <div className={classes.form}>
        <button type="button" onClick={showRevFormHandler}>
          Write a review
        </button>
        <Transition mountOnEnter unmountOnExit in={showRevForm} timeout={1000}>
          {(state) => <ReviewForm showRevForm={showRevForm} />}
        </Transition>
      </div>
    </section>
  );
};

export default ProductDetail;

export const loader = ({ params }) => {
  return getOneProduct(params.productId);
};
