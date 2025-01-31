 // Redux store setup

 import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import all reducers
import appointmentsReducer from "./slices/appointmentsSlice";
import ordersReducer from "./slices/ordersSlice";
import customersReducer from "./slices/customersSlice";
import productsReducer from "./slices/productsSlice";
import paymentsReducer from "./slices/paymentsSlice";
import salesReducer from "./slices/salesSlice";

// Persistence configuration
const persistConfig = { key: "root", storage };

// Combine all reducers
const rootReducer = combineReducers({
  appointments: appointmentsReducer,
  orders: ordersReducer,
  customers: customersReducer,
  products: productsReducer,
  payments: paymentsReducer,
  sales: salesReducer,
});

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist compatibility
    }),
});

// Export the store and persistor for application setup
export const persistor = persistStore(store);
export default store;
