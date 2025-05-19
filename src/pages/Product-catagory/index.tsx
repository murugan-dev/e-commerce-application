import React, { useState } from "react";

// Custom data
import data from "./data.json";

// Styles
import "./styles.scss";

// custom components
import ProductCard from "../Product-card/index.tsx";

function ProductCategory() {
  const [category, setCategory] = useState<string>("");
  return (
    <>
      <div className="product-category-list">
        {data?.map((item, index) => (
          <button
            key={item?.id}
            className={`product-category ${
              category === item?.title ? "active-category" : ""
            }`}
            onClick={() => setCategory(item?.title)}
          >
            <img
              src={item?.img}
              alt={item?.title}
              className={`product-img ${
                category === item?.title ? "active-category-img" : ""
              }`}
              loading="lazy"
            />
            <p className="product-title">{item?.title}</p>
          </button>
        ))}
      </div>
      <ProductCard category={category} setCategory={setCategory} />
    </>
  );
}

export default ProductCategory;
