import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 firms: [],
  token: "",
  loading: false,
  error: false,
};

const firmsSlice = createSlice({
    name: "firms",
    initialState,
    reducers: {
fetchFirmsStart: (state)=> {
state.loading = true;
},

firmsSuccess: (state, {payload}) => {
state.loading = false;
state.firms=payload.data
},

fetchFirmsFail: (state)=> {
state.loading = false;
state.error = true;
},


    }
});

export const {
    fetchFirmsStart,
    firmsSuccess,
    fetchFirmsFail,
} =firmsSlice.actions;


export default firmsSlice.reducer;