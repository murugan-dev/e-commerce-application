// React and react related imports
import React from "react";

// third party libraries
import { useLocation } from "react-router-dom";
import { FaStar, FaTag } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

// custom component
import Header from "../Header";
import { type ProductInfo, type DateAndDay } from "@/types/types";
import { addToCard, removeCard } from "@/redux/reducer/addToCard";

// styles
import "./styles.scss";

function getDateAndDayAfterFourDays(): DateAndDay {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 4);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[futureDate.getDay()];
  const formattedDate = futureDate.toISOString().split("T")[0];
  return {
    date: formattedDate,
    day: dayOfWeek,
  };
}

const Bankoffers = [
  "Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
  "Bank Offer 10% off up to ₹1,250 on HDFC Bank Credit Card Transactions. Min Txn Value: ₹4,990",
  "Bank Offer10% off up to ₹1,500 on HDFC Bank Credit Card EMI Transactions. Min Txn Value: ₹4,990",
  "Special PriceGet extra 50% off (price inclusive of cashback/coupon)",
];

function ViewDetailsPage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const carts = useSelector(
    (state: { addToCard: { cartItems: ProductInfo[] } }) =>
      state?.addToCard?.cartItems
  );
  const product: ProductInfo = location?.state?.product;
  const { date, day } = getDateAndDayAfterFourDays();

  function addToCart(product: ProductInfo) {
    dispatch(addToCard(product));
  }
  function removeToCart(product: ProductInfo) {
    dispatch(removeCard(product));
  }

  const isItemInCart = (item: ProductInfo): boolean => {
    return carts.some((cartItem) => cartItem.id === item.id);
  };

  return (
    <div>
      <Header />
      <div className="view-details-page-container">
        <div className="img">
          <img src={product?.image} alt={product?.description} loading="lazy" />
        </div>
        <div className="contents">
          <p className="product_description">{product?.description}</p>
          <p className="Product_tittle">{product?.title}</p>
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
          <p className="pricing_heading">Special price</p>

          <div className="price">
            <span>${product?.price} </span>
            <span>{product?.price + 100}</span>
            <span>23% off</span>
          </div>
          <p className="delivery">
            secured delivery by {date}, {day}
          </p>
          <div>
            <p className="bank-offer_heading">Available offers</p>
            <ul>
              {Bankoffers.map((offer, index) => (
                <li key={offer} className="bank-offer-list">
                  <FaTag className="offer-tag-icon" /> {offer}
                </li>
              ))}
            </ul>
          </div>
          <div className="btn-container">
            <button className="btn-buy-now">Buy Now</button>
            {/* <button className="btn-add_cart" onClick={()=>addToCart(product)}>Add to Cart</button>
            <button className="btn-add_cart" onClick={()=>removeToCart(product)}>Remove Cart</button> */}
            {!isItemInCart(product) && (
              <button
                className="product-card__button btn-add_cart"
                onClick={(e) => addToCart(product)}
              >
                Add to Cart
              </button>
            )}
            {isItemInCart(product) && (
              <button
                className="product-card__button btn-remove_cart"
                onClick={(e) => removeToCart(product)}
              >
                Remove cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailsPage;
