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
},


fetchStockFail: (state)=> {
state.loading = false;
state.error = true;
},


    }
});

// export const { fetchStockStart, getFirmsSuccess, fetchStockFail } = stockSlice.actions;
export const { fetchStockStart, getStockSuccess, fetchStockFail } = stockSlice.actions;


export default stockSlice.reducer;