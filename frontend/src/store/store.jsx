import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userReducer } from './reducers/userReducer'; 
import storeReducer, { ProductsByReducer, storeListReducer } from './reducers/storeReducer';
import { documentReducer } from './reducers/documentReducer'; 
import AllUserReducer from './reducers/AllUserReducer';
import categoryReducer from './reducers/categoryReducer';
import productDeleteReducer, { addProductReducer, allProductsReducer , productReducer, 
       storeProductsReducer, updateProductReducer } from './reducers/productReducer';
import adReducer from './reducers/adReducer';
import { packageReducer } from './reducers/packageReducer';
import { orderCreateReducer, userOrdersReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({
  SingleproductDetails: productReducer,
  ProductsByReducer: ProductsByReducer,
  storeProducts: storeProductsReducer,
  productUpdate: updateProductReducer,
  deleteProduct: productDeleteReducer,
  categoryForStore: categoryReducer,
  allProducts: allProductsReducer,
  productAdd: addProductReducer,
  userLogin: userLoginReducer,
  categories: categoryReducer,
  storeList: storeListReducer,
  documents: documentReducer, 
  package: packageReducer,
  users: AllUserReducer,
  store: storeReducer,
  adData: adReducer,
  user: userReducer,
  orderCreate: orderCreateReducer,
  userOrders: userOrdersReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
