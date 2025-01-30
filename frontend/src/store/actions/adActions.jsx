import axios from 'axios';
import {
    GET_ACTIVE_ADS_REQUEST,
    GET_ACTIVE_ADS_SUCCESS,
    GET_ACTIVE_ADS_FAILURE,
    FETCH_ADS_REQUEST,
    FETCH_AD_BY_ID_SUCCESS,
    FETCH_ADS_FAILURE,
    UPDATE_AD_SUCCESS,
    UPDATE_AD_FAIL,
    UPDATE_AD_REQUEST,
    DELETE_AD,
    CREATE_AD_FAIL,
    CREATE_AD_SUCCESS,
    CREATE_AD_REQUEST,
  } from '../constants/AdsConstants';
  
export const createAd = (adData, image) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_AD_REQUEST });

    const formData = new FormData();
    formData.append('title', adData.title);
    formData.append('description', adData.description);
    formData.append('product', adData.product);
    formData.append('startDate', adData.startDate);
    formData.append('endDate', adData.endDate);
    formData.append('image', image);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    };

    const response = await axios.post(`${import.meta.env.VITE_APP}/api/v1/ads`, formData, config);

    dispatch({
      type: CREATE_AD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_AD_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};


  export const getActiveAds = () => async (dispatch) => {
    dispatch({ type: GET_ACTIVE_ADS_REQUEST });
  
    try {
      const response = await fetch(`${import.meta.env.VITE_APP}/api/v1/ads/active`);
      const data = await response.json();
      if (data.success) {
        dispatch({
          type: GET_ACTIVE_ADS_SUCCESS,
          payload: data.ads, 
        });
      } else {
        throw new Error('Failed to fetch active ads');
      }
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_ADS_FAILURE,
        payload: error.message,
      });
    }
  };
  

  export const deleteAd = (adId) => async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      await axios.delete(`${import.meta.env.VITE_APP}/api/v1/ads/${adId}` , config);
      dispatch({
        type: DELETE_AD,
        payload: adId, 
      });
      dispatch(getActiveAds()); 
    } catch (error) {
      console.error(error);
    }
  };
  

  export const updateAd = (id, formData) => async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      dispatch({ type: UPDATE_AD_REQUEST });
  
      const response = await axios.put(`${import.meta.env.VITE_APP}/api/v1/ads/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      dispatch({
        type: UPDATE_AD_SUCCESS,
        payload: response.data.ad, 
      });
  
    } catch (error) {
      dispatch({
        type: UPDATE_AD_FAIL,
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };
  

  // Get single ad by ID
export const getActiveAdById = (adId) => async (dispatch) => {
  dispatch({ type: FETCH_ADS_REQUEST });
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP}/api/v1/ads/active/${adId}`);
    dispatch({ type: FETCH_AD_BY_ID_SUCCESS, payload: response.data.ad });
  } catch (error) {
    dispatch({
      type: FETCH_ADS_FAILURE,
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};