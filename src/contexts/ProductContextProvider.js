import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

export const productContext = createContext();

export const useProduct = () => useContext(productContext);

const API = "http://34.173.115.25/api/v1";

const INIT_STATE = {
  products: [],
  pages: 0,
  categories: [],
  oneProduct: null,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload.results,
        pages: Math.ceil(action.payload.count / 6),
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };

    case "GET_ONE_PRODUCT":
      return {
        ...state,
        oneProduct: action.payload,
      };

    default:
      return state;
  }
}

const ProductContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      const res = await axios.get(
        `${API}/products/${window.location.search}`,
        config
      );

      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      const res = await axios.get(`${API}/category/list/`, config);
      dispatch({
        type: "GET_CATEGORIES",
        payload: res.data.results,
      });
    } catch (error) {}
  };

  // CREATE

  const createProduct = async (newProduct) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      const res = await axios.post(`${API}/products/`, newProduct, config);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      await axios.delete(`${API}/products/${id}/`, config);

      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const getOneProduct = async (id) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      let res = await axios.get(`${API}/products/${id}/`, config);

      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, editedProduct) => {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access}`;

      const config = {
        headers: {
          Authorization,
        },
      };

      let res = await axios.patch(
        `${API}/products/${id}/`,
        editedProduct,
        config
      );

      navigate("/products");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    getProducts,
    products: state.products,
    pages: state.pages,

    getCategories,
    categories: state.categcories,

    createProduct,
    deleteProduct,

    // edit
    getOneProduct, // get one product
    oneProduct: state.oneProduct,
    updateProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
