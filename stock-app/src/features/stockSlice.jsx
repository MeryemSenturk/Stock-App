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
 * @description Sets `state.loading` to `true` and `state.error` to `false`.
 * 
 * @param { boolean } state - state of the application, which is updated to reflect
 * the loading or error status of the code.
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
 * @description Updates a state object by setting the value for a specific path to
 * the provided stock data, and setting the loading and error flags accordingly.
 * 
 * @param { object } state - application's current state, including the loading status
 * and error information, and updates it with the new payload of `stockData`.
 */
getStockSuccess: (state, {payload: {path, stockData}}) => {
    state.loading = false;
    state[path]=stockData
    state.error = false;
},

/**
 * @description Updates the `state` object by setting the `loading` property to
 * `false`, and then assigns the `products`, `purchases`, `brands`, and `firms`
 * properties based on the provided `payload`.
 * 
 * @param { object } state - application's state, including loading status and data
 * from various collections such as products, purchases, brands, and firms, which are
 * updated based on the payload received.
 * 
 * @param { object } payload - products, purchases, brands, and firms data that is
 * passed to the component as props.
 */
getProPurBraFirmSuccess: (state, {payload}) => {
    state.loading = false;
    state.products = payload?.products;
    state.purchases = payload?.purchases;
    state.brands = payload?.brands;
    state.firms = payload?.firms;
},

/**
 * @description Sets the state variables `loading` and `error` to their respective
 * opposite values. Specifically, `loading` is set to `false`, while `error` is set
 * to `true`.
 * 
 * @param { `ErrorStatus`. } state - state of the application, indicating whether the
 * loading process is ongoing or if an error has occurred.
 * 
 * 		- `loading`: A boolean property indicating whether the stock data is currently
 * being fetched (true) or not (false).
 * 		- `error`: A boolean property indicating whether an error occurred during the
 * fetching process (true) or not (false).
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