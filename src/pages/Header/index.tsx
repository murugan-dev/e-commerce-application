// React and react related imports
import React from 'react'

// types
import { type ProductInfo } from '@/types/types';

// Third party libaries
import { BsCartCheck } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SiReactivex } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


// styles
import "./style.scss";

function Header() {
  const navigate = useNavigate();
  const carts = useSelector((state: { addToCard: { cartItems: ProductInfo[] } })=> state?.addToCard?.cartItems)

  function redirectToCart() {
    navigate('/your-carts')
  }
  return (
    <header className="header">
       <SiReactivex className="logo"/>
      <div className="search-box">

      <input
        type="text"
        placeholder="Search a products, brands and more"
        className="search"
      />
      <CiSearch className="search-icon"/>
      </div>
      <button className="add-to-cart" onClick={redirectToCart} data-count={carts.length}>
        <BsCartCheck className="add-to-cart-troly" />
        <p>Cart</p>
      </button>
    </header>
  );
}

export default Header;
