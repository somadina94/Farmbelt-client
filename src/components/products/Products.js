import { useLoaderData } from "react-router-dom";

import classes from "./Products.module.css";
import Product from "./Product";
import { getAllProducts } from "../../api/api";

const Products = () => {
  const data = useLoaderData();
  const products = data.data.products;

  return (
    <section className={classes.products}>
      <ul>
        {products.map((prod) => (
          <Product
            key={prod._id}
            name={prod.name}
            id={prod._id}
            price={prod.price}
            ratingsAverage={Math.round(prod.ratingsAverage)}
            photo={prod.photo}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

export const loader = () => {
  return getAllProducts();
};
