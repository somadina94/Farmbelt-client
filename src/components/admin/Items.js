import { useLoaderData } from "react-router-dom";

import Item from "./Item";
import classes from "./Items.module.css";
import { getProducts } from "../../api/api";

const Items = () => {
  const data = useLoaderData();
  const products = data.data.products;
  return (
    <ul className={classes.items}>
      {products.map((prod) => (
        <Item
          key={prod._id}
          id={prod._id}
          name={prod.name}
          price={prod.price}
          photo={prod.photo}
        />
      ))}
    </ul>
  );
};

export default Items;

export const loader = () => {
  return getProducts();
};
