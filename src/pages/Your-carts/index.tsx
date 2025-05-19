// React and react related imports
import React, { useEffect, useState } from "react";

// types
import { type ProductInfo } from "@/types/types.ts";

// Third party librariies
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// Custom component
import Header from "../Header/index.tsx";

// styles
import "./styles.scss";

function YourCarts() {
  const navigate = useNavigate();
  const carts = useSelector(
    (state: { addToCard: { cartItems: ProductInfo[] } }) =>
      state.addToCard.cartItems
  );
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const handleIncrement = (productId: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 0) - 1, 1),
    }));
  };
  const totalAmount = carts.reduce((total, product) => {
    const productCount = counts[product.id] || 1;
    return total + productCount * product.price;
  }, 0);

  function redirectToBuyPage(){
    navigate('/buy-now', {
      state: {
        products: carts, counts
      }
    })
  }

  useEffect(() => {
    if (carts?.length) {
      const initialCounts = carts.reduce((acc, product) => {
        acc[product.id] = 1;
        return acc;
      }, {} as { [key: string]: number });
      setCounts(initialCounts);
    }
  }, [carts]);

  return (
    <div>
      <Header />
      <div className="heading">
        <h2>Your Carts</h2>
      </div>
      {!carts?.length && (
        <div className="no-carts-found">
          <p>No carts found</p>
        </div>
      )}
      {carts?.map((product: ProductInfo) => (
        <div
          key={`${product.id} + ${product.category}`}
          className="carts-container"
        >
          <div className="product-card">
            <div className="product-card__image">
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            <div className="product-card__content">
              <h2 className="product-card__title">{product.description}</h2>
              <div className="reviews">
                <div className="rating-div">
                  <span className="rating">
                    {product?.rating?.rate} <FaStar className="star" />
                  </span>
                </div>
                &
                <div className="rating_count">
                  ({product?.rating?.count}) Reviews
                </div>
              </div>
              <div className="price">
                <span>${product?.price} </span>
                <span>{product?.price + 100}</span>
                <span>23% off</span>
              </div>
            </div>
          </div>
          <div className="quantity">
            <h2>Quantity</h2>
            <div className="counter">
              <button
                className="btn"
                disabled={(counts[product.id] || 0) === 0}
                onClick={() => handleDecrement(product.id)}
              >
                -
              </button>
              <p>{counts[product.id] || 1}</p>
              <button
                className="btn"
                onClick={() => handleIncrement(product.id)}
              >
                +
              </button>
            </div>
          </div>
          <div className="total_price">
            <h2>Total</h2>
            <h3>${(product?.price * (counts[product.id] || 0)).toFixed(2)}</h3>
          </div>
        </div>
      ))}
        <div className="footer-container">
          <button className="btn back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
      {!!carts?.length && (
        <>
          <div className="grand-total"> Grand Total: {totalAmount.toFixed(2)}</div>
          <button className="btn buy-now-btn" onClick={redirectToBuyPage}>Buy Now</button>
        </>
        )}
        </div>
    </div>
  );
}

export default YourCarts;
