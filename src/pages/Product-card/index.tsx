import React, { useEffect, useState } from "react";

// Third party libraries
import { FaStar } from "react-icons/fa6";
import { AiFillBackward } from "react-icons/ai";
import { IoMdFastforward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//types
import { type ProductInfo, type ProductCategory } from "@/types/types.ts";

// Custom Components
import { addToCard, removeCard } from "@/redux/reducer/addToCard.js";

// API data files
import AppliancesData from "@/data/appliances-data.json";
import ElectronicsData from "@/data/electronics-data.json";
import FashionData from "@/data/fashion-data.json";
import MobileData from "@/data/mobile-data.json";
import ShoesData from "@/data/shoes-data.json";
import ToysData from "@/data/toys-data.json";

// Styles
import "./styles.scss";

const dataPromises = [
  new Promise((resolve) => setTimeout(() => resolve(AppliancesData), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(ElectronicsData), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(FashionData), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(MobileData), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(ShoesData), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(ToysData), 2000)),
];

function generateArray(n: number): number[] {
  return Array.from({ length: n }, (_, index) => index + 1);
}

function ProductCard({ category, setCategory }: Readonly<ProductCategory>) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [filterCategory, setFilterCategory] = useState<ProductInfo[]>(products);
  const [pages, setPages] = useState<[] | number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const carts = useSelector(
    (state: { addToCard: { cartItems: ProductInfo[] } }) =>
      state?.addToCard?.cartItems
  );

  function addToCart(e: React.MouseEvent, product: ProductInfo): void {
    e.stopPropagation();
    dispatch(addToCard(product));
  }

  const isItemInCart = (item: ProductInfo): boolean => {
    return carts.some((cartItem) => cartItem.id === item.id);
  };

  function removeToCart(e: React.MouseEvent, product: ProductInfo): void {
    e.stopPropagation();
    dispatch(removeCard(product));
  }

  function pageForward() {
    if (activePage < pages.length) {
      setActivePage(activePage + 1);
    }
  }

  function pageBackward() {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  }

  function navigateToViewPage(product: ProductInfo): void {
    navigate(`/view-details`, { state: { product } });
  }

  function navigateToBuyPage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: ProductInfo
  ) {
    e.stopPropagation();
    navigate("/buy-now", { state: { products: [product] } });
  }

  function fetchProducts(): void {
    Promise.all(dataPromises)
      .then((results) => {
        const combinedData = results.flatMap((obj) => Object.values(obj)[0]);
        const numOfPages = generateArray(combinedData?.length / 10);
        setPages(numOfPages);
        setProducts(combinedData);
        setFilterCategory(
          combinedData?.slice((activePage - 1) * 10, activePage * 10 + 2)
        );
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  useEffect(() => {
    const filteredCategory = products.filter(
      (product) => product.category?.toLowerCase() === category?.toLowerCase()
    );
    if (category) {
      const numOfPages = generateArray(filteredCategory?.length / 10);
      setPages(numOfPages);
      setFilterCategory(filteredCategory);
    } else {
      setFilterCategory(
        products?.slice((activePage - 1) * 10, activePage * 10 + 2)
      );
      const numOfPages = generateArray(products?.length / 10);
      setPages(numOfPages);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activePage]);

  return (
    <div className="product-card__container">
      <div className="product-card__title_header">
        <button
          className={`all-product-btn ${!category && "all-product-active"}`}
          onClick={() => setCategory("")}
        >
          All product
        </button>
        <h2
          className={`product-card__heading ${category && "active-category"}`}
        >
          {category}
        </h2>
      </div>
      {products?.length === 0 && <p>Loading.....</p>}
      {!!products?.length && (
        <>
          <div className="product-card__grid">
            {filterCategory?.map((product: ProductInfo) => (
              <div
                className="product-card"
                key={`${product.id} + ${product.category}`}
                onClick={() => navigateToViewPage(product)}
              >
                <div className="product-card__image">
                  <img src={product.image} alt={product.title} loading="lazy" />
                </div>
                <div className="product-card__content">
                  <h2 className="product-card__title">{product.description}</h2>
                  <div className="product-card__reviews">
                    <div className="product-card__rating">
                      <p>{product.rating.rate}</p> <FaStar className="star" />
                    </div>
                    <div>({product.rating.count})</div>
                  </div>
                  <p className="product-card__price">
                    ${product.price}{" "}
                    <span className="product-card__old_price">
                      {product.price + 100}
                    </span>
                    <span className="product-card__offer">23% off</span>
                  </p>
                  <div className="btn-container">
                    {!isItemInCart(product) && (
                      <button
                        className="product-card__button btn-add_cart"
                        onClick={(e) => addToCart(e, product)}
                      >
                        Add to Cart
                      </button>
                    )}
                    {isItemInCart(product) && (
                      <button
                        className="product-card__button btn-remove_cart"
                        onClick={(e) => removeToCart(e, product)}
                      >
                        Remove cart
                      </button>
                    )}
                    <button
                      className="product-card__button btn-buy-now"
                      onClick={(e) => navigateToBuyPage(e, product)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {pages?.length > 1 && (
            <ul className="pagination">
              <button className="page-btn" onClick={pageBackward}>
                <AiFillBackward />
              </button>
              {pages?.map((item: number) => {
                return (
                  <li key={item}>
                    <button
                      onClick={() => setActivePage(item)}
                      className={`page-btn ${
                        activePage === item ? "active-page" : ""
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
              <button className="page-btn" onClick={pageForward}>
                <IoMdFastforward />
              </button>
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ProductCard;
