import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 firms: [],
 purchases: [],
 sales: [],
 products: [],
 brands: [],
 categories: [],
loading: false,
error: false,
};

const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {
/**
 * @description Sets two state variables: `loading` to `true`, and `error` to `false`.
 * 
 * @param { object } state - state of the application, which is set to `true` for the
 * loading state and `false` for the error state upon entry into the function.
 */
fetchStockStart: (state)=> {
state.loading = true;
state.error = false;
},

// getFirmsSuccess: (state, {payload}) => {
// state.loading = false;
// state.firms=payload
// },

// getStockSuccess: (state, action) => {
//     state.loading = false;
//     state[action.payload.path]=action.payload.stockData
// },

/**
 * @description Updates a state object by setting `loading` to `false`, assigning
 * `stockData` to the path provided, and resetting `error` to `false`.
 * 
 * @param { object } state - state of the application, specifically setting the values
 * of `loading`, `error`, and the given path to the new value provided in the `stockData`
 * payload.
 */
getStockSuccess: (state, {payload: {path, stockData}}) => {
    state.loading = false;
    state[path]=stockData
    state.error = false;
},

/**
 * @description Updates state variables for loading, products, purchases, brands and
 * firms upon a successful request.
 * 
 * @param { object } state - application's state, which includes various values related
 * to the shopping cart, products, purchases, brands, and firms.
 * 
 * @param { 📦. } payload - products, purchases, brands, and firms data that are being
 * updated in the state variable `state`.
 * 
 * 		- `state`: an object that represents the application state, which includes fields
 * for `loading`, `products`, `purchases`, `brands`, and `firms`.
 * 		- `x`: a variable that contains the deserialized data in the form of an array
 * or a single value, depending on the type of the `payload` field.
 */
getProPurBraFirmSuccess: (state, {payload}) => {
    state.loading = false;
    state.products = x;
    state.purchases = x;
    state.brands = x;
    state.firms = x;
},

/**
 * @description Sets `loading` to `false` and `error` to `true`.
 * 
 * @param { object } state - state of the application, providing whether the loading
 * is active or an error has occurred.
 */
fetchStockFail: (state)=> {
state.loading = false;
state.error = true;
},


    }
});

// export const { fetchStockStart, getFirmsSuccess, fetchStockFail } = stockSlice.actions;
export const { fetchStockStart, getStockSuccess, fetchStockFail, getProPurBraFirmSuccess } = stockSlice.actions;


export default stockSlice.reducer;