import { configureStore } from '@reduxjs/toolkit';
import counterReducer,{reset} from './Reducers/counterSlice';
import logger from "redux-logger";

// Your custom middleware
const middleware1 = (store) => (next) => (action) => {

  const currentState = store.getState().counter.value; 

  if (currentState >= 19) {
    return console.log("Store is exceeded");
  }
  console.log("currentState:",currentState)
  return next(action);
};

// Define the initial state
 let preloadedState = {
  counter: {
    value: 10 // You can set any initial value you want
  }
};

const simpleEnhancer = (createstore) => (reducer, preloadedState, enhancer) => {
  const store = createstore(reducer, preloadedState, enhancer);

  const enhancedStore = {
    ...store,
    resetCounter: () => {
      console.log("we are in enhancer");
      store.dispatch(reset());
    }
  };

  return enhancedStore;
};


export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware :[middleware1,logger],
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware1,logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState, 
  enhancers: [simpleEnhancer],
});

