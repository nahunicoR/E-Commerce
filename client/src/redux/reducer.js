import { createSlice } from "@reduxjs/toolkit"


const productsSlice = createSlice({
  name: "products",
  initialState: {
      products: [],
      productsDetail: {}
  },
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload
    },
    getProducDetail: (state, action) => {
      state.productsDetail = action.payload
    }
  }
})

export const { getAllProducts, getProducDetail } = productsSlice.actions

export default productsSlice.reducer


