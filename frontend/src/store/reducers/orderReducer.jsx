import { 
    CREATE_ORDER_REQUEST, 
    CREATE_ORDER_SUCCESS, 
    CREATE_ORDER_FAIL, 
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAIL
} from "../constants/orderConstants";

const initialState = {
    orders: [],
    loading: false,
    error: null,
  };

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true };

        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload };

        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};



export const userOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_ORDERS_REQUEST:
        return { ...state, loading: true };
      case GET_USER_ORDERS_SUCCESS:
        return { ...state, loading: false, orders: action.payload };
      case GET_USER_ORDERS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  