// storeActions.js

import axios from 'axios';
import { 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
    STORE_REGISTER_REQUEST, STORE_REGISTER_SUCCESS, STORE_REGISTER_FAIL, 
    UPLOAD_DOCUMENT_REQUEST, UPLOAD_DOCUMENT_SUCCESS, UPLOAD_DOCUMENT_FAIL,
    FETCH_STORE_REQUEST, FETCH_STORE_SUCCESS, FETCH_STORE_FAILURE,
    UPDATE_STORE_REQUEST, UPDATE_STORE_SUCCESS, UPDATE_STORE_FAILURE,
    FETCH_STORES_REQUEST, FETCH_STORES_SUCCESS,FETCH_STORES_FAILURE,
    STORE_LIST_REQUEST, STORE_LIST_SUCCESS, STORE_LIST_FAIL,
    FETCH_STORE_PRODUCTS_REQUEST, FETCH_STORE_PRODUCTS_SUCCESS, FETCH_STORE_PRODUCTS_FAILURE 
} from '../constants/StoreConstants';  
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from '../constants/productConstants';

export const uploadDocument = (formData) => async (dispatch) => {
  try {
    dispatch({ type: UPLOAD_DOCUMENT_REQUEST });

    const token = localStorage.getItem('storeToken');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_APP}/api/v1/doc`, 
      formData, 
      config
    );

    dispatch({ type: UPLOAD_DOCUMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPLOAD_DOCUMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const registerStore = (storeData) => async (dispatch) => {
  try {
    console.log(storeData)
      dispatch({ type: STORE_REGISTER_REQUEST });
      const response = await fetch(`${import.meta.env.VITE_APP}/api/v1/store/register`, {
          method: 'POST',
          body: storeData,  
      });

      const data = await response.json();
      if (response.ok) {
          localStorage.setItem('storeToken', data.token);
          dispatch({ type: STORE_REGISTER_SUCCESS, payload: data });
      } else {
          dispatch({ type: STORE_REGISTER_FAIL, payload: data.message || 'Something went wrong' });
      }
  } catch (error) {
      dispatch({ type: STORE_REGISTER_FAIL, payload: error.message });
  }
};

export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
    type: LOGIN_SUCCESS,
    payload: userData,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const loginStore = (formData) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${import.meta.env.VITE_APP}/api/v1/store/login`, formData);
        dispatch(loginSuccess(response.data));
        localStorage.setItem('storeToken', response.data.token);
    } catch (err) {
        dispatch(loginFailure(err.response?.data?.message || 'Login failed.'));
    }
};




// get store by token


export const fetchStore = () => async (dispatch) => {
    dispatch({ type: FETCH_STORE_REQUEST });

    try {
        const token = localStorage.getItem("storeToken");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`${import.meta.env.VITE_APP}/api/v1/store/profile`, config);
        
        dispatch({ type: FETCH_STORE_SUCCESS, payload: response.data.store });
    } catch (error) {
        dispatch({
            type: FETCH_STORE_FAILURE,
            payload: error.response?.data?.message || "Something went wrong",
        });
    }
};


// get store by id 

export const getStore = (storeId) => async (dispatch) => {
  dispatch({ type: FETCH_STORE_REQUEST });
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP}/api/v1/store/store/${storeId}`);
    dispatch({ type: FETCH_STORE_SUCCESS, payload: response.data.store });
  } catch (error) {
    dispatch({
      type: FETCH_STORE_FAILURE,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};




// update store info data 


export const updateStoreProfile = (storeData) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_STORE_REQUEST });
  
      try {
        const token = localStorage.getItem("storeToken");
        const response = await fetch(
          `${import.meta.env.VITE_APP}/api/v1/store/update-profile`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
            credentials: "include",  
            body: JSON.stringify(storeData),
          }
        );
  
        const data = await response.json();
        console.log(data);
  
        if (response.ok && data.success) {
          dispatch({ type: UPDATE_STORE_SUCCESS, payload: data.store });
        } else {
          dispatch({
            type: UPDATE_STORE_FAILURE,
            payload: data.message || "Failed to update profile",
          });
        }
      } catch (error) {
        dispatch({
          type: UPDATE_STORE_FAILURE,
          payload: error.message || "Something went wrong",
        });
      }
    };
  };
  
  


  // fetch all store with admin access 


  export const fetchStores = () => async (dispatch) => {
    dispatch({ type: FETCH_STORES_REQUEST });
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${import.meta.env.VITE_APP}/api/v1/store/all`, config);
      console.log(response.data);
      dispatch({ type: FETCH_STORES_SUCCESS, payload: response.data.stores.docs }); 
    } catch (error) {
      dispatch({
        type: FETCH_STORES_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
  


  // Action to fetch all stores
export const listStores = (page = 1, limit = 10, sortBy = '-createdAt') => async (dispatch) => {
  try {
    dispatch({ type: STORE_LIST_REQUEST });

    const { data } = await axios.get(`${import.meta.env.VITE_APP}/api/v1/store/all-store`, {
      params: { page, limit, sortBy },
    });

    dispatch({
      type: STORE_LIST_SUCCESS,
      payload: data.stores, 
    });

  } catch (error) {
    dispatch({
      type: STORE_LIST_FAIL,
      payload: error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message,
    });
  }
};




// get product by store name 


export const fetchStoreProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_STORE_PRODUCTS_REQUEST });
    try {
      // Fetch stores
      const storesResponse = await fetch(`${import.meta.env.VITE_APP}/api/v1/store/all-store`);
      const storesData = await storesResponse.json();
      
      // Collect product IDs
      const productIds = storesData.stores.docs.flatMap(store => store.products);
      if (productIds.length === 0) {
        console.log("No product IDs found.");
        return;
      }
      
      const idsQueryString = `ids=${productIds.join(',')}`; 
      
      const productsResponse = await fetch(`${import.meta.env.VITE_APP}/api/v1/products/bystore?${idsQueryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const productsData = await productsResponse.json();

      dispatch({
        type: FETCH_STORE_PRODUCTS_SUCCESS,
        payload: {
          stores: storesData.stores.docs,
          products: productsData.products || []
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_STORE_PRODUCTS_FAILURE,
        payload: error.message
      });
    }
  };
};



export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const fetchProductsByStore = (storeId) => {
  return async (dispatch) => {
    if (!storeId) {
      return; 
    }
    
    dispatch(fetchProductsRequest());
    
    try {
      const response = await fetch(`${import.meta.env.VITE_APP}/api/v1/store/${storeId}/products`);
      const data = await response.json();

      if (data.success) {
        dispatch(fetchProductsSuccess(data.products));
      } else {
        dispatch(fetchProductsFailure('Failed to fetch products.'));
      }
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
