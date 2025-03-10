// React and react related imports
import React, { useEffect, useState } from "react";

// Types
import { type ProductInfo } from "@/types/types";

// Third party Libraries
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";

// Custom Component
import Header from "../Header";
import formSchema from '@/utils/formSchema'

// Styles
import "./styles.scss";

const BuyNow = () => {
  const location = useLocation();
  const { products = [], counts = {} } = location?.state || {};

  const [count, setCount] = useState<{ [key: string]: number }>(() => {
    const initialCounts: { [key: string]: number } = {};
    if (products) {
      products.forEach((product: ProductInfo) => {
        initialCounts[product.id] = 1;
      });
    }
    return initialCounts;
  });

  const initialData = {
    firstName: "",
    lastName: "",
    address: "",
    payment: "",
  };

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleIncrement = (productId: number) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: number) => {
    setCount((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 0) - 1, 1),
    }));
  };

  const totalAmount = products.reduce((total: number, product: ProductInfo) => {
    const productCount = count[product.id] || 1;
    return total + productCount * product.price;
  }, 0);

  useEffect(() => {
    if (Object.keys(counts)) {
      setCount(counts);
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="buy_now-heading">
        <h2>Buy Product List</h2>
      </div>
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item: ProductInfo) => {
              const quantity = count[item.id] || 1; // Default to 1 if count is not set
              const totalPrice = (item.price * quantity).toFixed(2); // Calculate total price
              return (
                <tr key={item?.id}>
                  <th>{item?.description}</th>
                  <th>${item?.price}</th>
                  <th>
                    <div className="product_quantity">
                      <button onClick={() => handleDecrement(item?.id)}>
                        -
                      </button>
                      <p>{quantity}</p>
                      <button onClick={() => handleIncrement(item?.id)}>
                        +
                      </button>
                    </div>
                  </th>
                  <th>${totalPrice}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="buy-now-grand-total">
        <h3>Grand Total : {totalAmount}</h3>
      </div>
      <div className="user-info-heading">
        <h3>
          To proceed with placing your order, please provide the following
          information:
        </h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
      {/* First Name */}
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="errorText">{formik.errors.firstName}</div>
        ) : (
          <div className="helperText">Enter your first name</div>
        )}
      </div>

      {/* Last Name */}
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="errorText">{formik.errors.lastName}</div>
        ) : (
          <div className="helperText">Enter your last name</div>
        )}
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="errorText">{formik.errors.address}</div>
        ) : (
          <div className="helperText">Enter your full address</div>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <label htmlFor="payment">Mode of Payment</label>
        <div className="payment-method">
          <div>
            <label>
              <input
                type="radio"
                name="payment"
                value="GPay"
                checked={formik.values.payment === "GPay"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              GPay
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={formik.values.payment === "Cash on Delivery"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              Cash on Delivery
            </label>
          </div>
          {formik.touched.payment && formik.errors.payment ? (
            <div className="errorText">{formik.errors.payment}</div>
          ) : (
            <div className="helperText">Select a payment method</div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="place-order">
        <button type="submit">Place Order</button>
      </div>
    </form>
    </div>
  );
};

export default BuyNow;
