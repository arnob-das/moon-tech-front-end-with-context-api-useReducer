import React from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import {
  initialState,
  productReducer,
} from "../state/ProductState.js/ProductReducer";
import { actionTypes } from "../state/ProductState.js/ActionTypes";

export const PRODUCT_CONTEXT = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  console.log(state)

  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    fetch("products.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data })
      )
      .catch(() => {
        dispatch({ type: actionTypes.FETCHING_ERROR });
      });
  }, []);

  const value = { state, dispatch };
  return (
    <PRODUCT_CONTEXT.Provider value={value}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export default ProductProvider;
