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

getStockSuccess: (state, {payload: {path, stockData}}) => {
    state.loading = false;
    state[path]=stockData
    state.error = false;
},

getProPurBraFirmSuccess: (state, {payload}) => {
    state.loading = false;
    state.products = payload?.products;
    state.purchases = payload?.purchases;
    state.brands = payload?.brands;
    state.firms = payload?.firms;
},

fetchStockFail: (state)=> {
state.loading = false;
state.error = true;
},


    }
});

// export const { fetchStockStart, getFirmsSuccess, fetchStockFail } = stockSlice.actions;
export const { fetchStockStart, getStockSuccess, fetchStockFail, getProPurBraFirmSuccess } = stockSlice.actions;


export default stockSlice.reducer;