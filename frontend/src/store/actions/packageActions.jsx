import axios from 'axios';
import {
  GET_ALL_PACKAGES,
    PACKAGE_ERROR,
    SUBSCRIBE_PACKAGE_FAIL,
    SUBSCRIBE_PACKAGE_REQUEST,
    SUBSCRIBE_PACKAGE_SUCCESS,
    UPDATE_PACKAGE_FAIL,
    UPDATE_PACKAGE_REQUEST,
    UPDATE_PACKAGE_SUCCESS
} from '../constants/packageconstants'
import { getAuthConfig } from '../../utils/apiConfig';

export const subscribePackage = (packageType, paymentMethod) => async (dispatch) => {
  try {
    dispatch({ type: SUBSCRIBE_PACKAGE_REQUEST });

    const config = getAuthConfig()
    console.log(packageType , paymentMethod )

    const response = await axios.post(`${import.meta.env.VITE_APP}/api/v1/package`, { packageType, paymentMethod }, config);
    console.log(response.data)
    dispatch({
      type: SUBSCRIBE_PACKAGE_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: SUBSCRIBE_PACKAGE_FAIL,
      payload: error.response?.data?.message || 'Subscription failed',
    });
  }
};



// Action to fetch all packages
export const getAllPackages = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token"); 
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await axios.get(`${import.meta.env.VITE_APP}/api/v1/package`, config);
    dispatch({
      type: GET_ALL_PACKAGES,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: PACKAGE_ERROR,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


export const updatePackage = (id, packageData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PACKAGE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    };
    const { data } = await axios.put(`${import.meta.env.VITE_APP}/api/v1/package/${id}`, packageData, config);
    dispatch({
      type: UPDATE_PACKAGE_SUCCESS,
      payload: data.data, 
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PACKAGE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
