// storeReducer.js

import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  STORE_REGISTER_REQUEST, STORE_REGISTER_SUCCESS, STORE_REGISTER_FAIL,
  FETCH_STORE_REQUEST, FETCH_STORE_SUCCESS, FETCH_STORE_FAILURE,
  UPDATE_STORE_REQUEST, UPDATE_STORE_SUCCESS, UPDATE_STORE_FAILURE,
  FETCH_STORES_REQUEST, FETCH_STORES_SUCCESS, FETCH_STORES_FAILURE,
  STORE_LIST_REQUEST, STORE_LIST_SUCCESS, STORE_LIST_FAIL,
  FETCH_STORE_PRODUCTS_REQUEST, FETCH_STORE_PRODUCTS_SUCCESS, FETCH_STORE_PRODUCTS_FAILURE 
} from '../constants/StoreConstants'; 

const initialState = {
  store: {},    
  user: null,   
  loading: false,
  error: null,
  stores: [],
  products: [],
};


const storeReducer = (state = initialState, action) => {
  switch (action.type) {
      // Store Registration Actions
      case STORE_REGISTER_REQUEST:
          return { ...state, loading: true, error: null };
      case STORE_REGISTER_SUCCESS:
          return { ...state, loading: false, store: action.payload, error: null };
      case STORE_REGISTER_FAIL:
          return { ...state, loading: false, error: action.payload };

      // Store Login Actions
      case LOGIN_REQUEST:
          return { ...state, loading: true, error: null };
      case LOGIN_SUCCESS:
          return { ...state, loading: false, user: action.payload, error: null };
      case LOGIN_FAILURE:
          return { ...state, loading: false, error: action.payload };

        //   get store by id 
        case FETCH_STORE_REQUEST:
            return { ...state, loading: true };

        case FETCH_STORE_SUCCESS:
            return { ...state, loading: false, store: action.payload };

        case FETCH_STORE_FAILURE:
            return { ...state, loading: false, error: action.payload };

            // update store info data 
            case UPDATE_STORE_REQUEST:
                return { ...state, loading: true };
              case UPDATE_STORE_SUCCESS:
                return { ...state, storeInfo: action.payload, loading: false, error: null };
              case UPDATE_STORE_FAILURE:
                return { ...state, loading: false, error: action.payload };

              // get all stores by superadmin
              case FETCH_STORES_REQUEST:
                return { ...state, loading: true, error: null };
                case FETCH_STORES_SUCCESS:
                  return { ...state, loading: false, stores: action.payload };                
              case FETCH_STORES_FAILURE:
                return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};

export default storeReducer;



export const storeListReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case STORE_LIST_REQUEST:
      return { loading: true, stores: [] };

    case STORE_LIST_SUCCESS:
      return { loading: false, stores: action.payload.docs, pagination: action.payload };

    case STORE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



export const ProductsByReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORE_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case FETCH_STORE_PRODUCTS_SUCCESS:
      return {
        loading: false,
        stores: action.payload.stores,
        products: action.payload.products,
        error: null
      };
    case FETCH_STORE_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};