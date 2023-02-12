import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContextProvider";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { getProducts, products, pages } = useProduct();

  const [searchParams, setSearchParams] = useSearchParams(); //pagination

  const [currentPage, setCurrentPage] = useState(1);

  function getPagesCount() {
    let pageCountArr = [];

    for (let i = 1; i <= pages; i++) {
      pageCountArr.push(i);
    }

    return pageCountArr;
  }

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
    });
  }, [currentPage]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "3rem",
        }}
      >
        {products.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>

      <Pagination>
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />

        {getPagesCount().map((item) =>
          item === currentPage ? (
            <Pagination.Item
              onClick={() => setCurrentPage(item)}
              active
              key={item}
            >
              {item}
            </Pagination.Item>
          ) : (
            <Pagination.Item onClick={() => setCurrentPage(item)} key={item}>
              {item}
            </Pagination.Item>
          )
        )}

        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default ProductList;
