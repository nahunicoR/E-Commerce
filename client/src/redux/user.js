import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "user",
	initialState: {
        email: ''
	},
	reducers: {
        getUser: (state, action) => {
                state.email = action.payload;            
        }
    },
});

export const {
    getUser
} = productsSlice.actions;

export default productsSlice.reducer;
