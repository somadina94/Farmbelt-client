import classes from "./Review.module.css";
import RatingIcon from "../Icons/RatingIcon";

const Review = (props) => {
  const { name, review, rating } = props;
  const ratingsArr = [1, 2, 3, 4, 5];
  //   const key = Math.round(Math.random() * (10000 - 100 + 1) + 100);
  return (
    <div className={classes.review}>
      <h2>{name}</h2>
      <p>{review}</p>
      <div className={classes.icon}>
        {ratingsArr.map((star) => (
          <RatingIcon
            key={Math.round(Math.random() * (10000 - 100 + 1) + 100)}
            className={star <= rating ? classes.active : classes.inactive}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
