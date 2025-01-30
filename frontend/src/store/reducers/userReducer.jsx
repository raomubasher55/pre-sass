import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
} from '../constants/userConstants';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case REGISTER_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { loading: true };
        case LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case LOGIN_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
