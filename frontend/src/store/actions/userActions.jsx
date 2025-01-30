import axios from 'axios';
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
} from '../constants/userConstants';
import { toast } from 'react-toastify';

export const registerUser = (userData) => async (dispatch) => {
  console.log("Received userData in action: ", userData);
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    };

    const { data } = await axios.post(`${import.meta.env.VITE_APP}/api/v1/register`, userData, config);
    console.log(data.token);

    localStorage.setItem("token", data.token);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });

    // Show success toast
    toast.success("Registration successful!");

    setTimeout(() => {
      window.location.href = "/"; 
    }, 2000);
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response?.data?.message || error.message,
    });

    // Show error toast
    toast.error(`Registration failed: ${error.response?.data?.message || error.message}`);
  }
};






// login 


// Login action
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(`${import.meta.env.VITE_APP}/api/v1/login`, { email, password }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data,
        });

        // Save token to localStorage if needed or store it in Redux
        localStorage.setItem('token', data.token);

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        });
    }
};





