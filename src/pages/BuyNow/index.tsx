// React and react related imports
import React, { useEffect, useState } from "react";

// Types
import { type ProductInfo } from "../../types/types.ts";

// Third party Libraries
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

// Custom Component
import Header from "../Header/index.tsx";
import formSchema from "@/utils/formSchema.ts";

// Styles
import "./styles.scss";

const BuyNow = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
    name: "",
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
  const navigateToSuccesfullPage = () =>{
    const TrueValues = Object.values(formik?.values).filter((item)=> item !== '')
    if(TrueValues?.length !== 0 && TrueValues?.length === Object.values(formik?.values)?.length){
      navigate('/buy-successful')
    }
  }

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
        <h3>Grand Total : {totalAmount?.toFixed(2)}</h3>
      </div>
      <div className="user-info-heading">
        <h3>
          To proceed with placing your order, please provide the following
          information:
        </h3>
      </div>
      <form onSubmit={formik.handleSubmit} className="form-container">
        <div className="field">
          <label htmlFor="name" className="label">Name:</label>
          <div>

          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input ${formik.touched.name && formik.errors.name? "error-field": ''}`}
          />
          {formik.touched.name && formik.errors.name && (
            <div style={{ color: "red" }}>{formik.errors.name}</div>
          )}
          </div>
        </div>

        <div className="field" >
          <label htmlFor="address" className="label">Address:</label>
          <div>

          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`input ${formik.touched.address && formik.errors.address? "error-field": ''}`}
          />
          {formik.touched.address && formik.errors.address && (
            <div style={{ color: "red" }}>{formik.errors.address}</div>
          )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="payment" className="label">Mode of Payment:</label>
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
            
          </div>
        </div>
        {formik.touched.payment && formik.errors.payment && (
              <div style={{ color: "red" }}>{formik.errors.payment}</div>
            )}

        <div className="place-order">
          <button type="submit" onClick={navigateToSuccesfullPage}>Place Order</button>
        </div>
      </form>
    </div>
  );
};

export default BuyNow;
