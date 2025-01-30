import axios from "axios";
import { CREATE_ORDER_FAIL, 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    GET_USER_ORDERS_FAIL, 
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS
} from '../constants/orderConstants'
import { getAuthConfig, getUserConfig } from "../../utils/apiConfig";


// Create Order Action
export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });


        const config = getUserConfig()

        const { data } = await axios.post(`${import.meta.env.VITE_APP}/api/v1/order`, orderData, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ 
            type: CREATE_ORDER_FAIL, 
            payload: error.response?.data.message || error.message 
        });
    }
};



// Action to fetch user orders
export const getUserOrders = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    const config = getUserConfig()
    const { data } = await axios.get(`${import.meta.env.VITE_APP}/api/v1/user/orders`, config);

    dispatch({
      type: GET_USER_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
