import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		productsFilter: [],
		productsDetail: {},
		cart: localStorage.hasOwnProperty("cart") 
		?	JSON.parse(localStorage.getItem("cart"))
		: []
	},
	reducers: {
		getAllProducts: (state, action) => {
			state.products = action.payload;
			state.productsFilter = action.payload;
		},
		getProductsDetail: (state, action) => {
			state.productsDetail = action.payload;
		},
		orderByName: (state, action) => {
			action.payload === "A-Z"
				? state.products.sort((a, b) => {
						if (a.title > b.title) {
							return 1;
						}
						if (b.title > a.title) {
							return -1;
						}
						return 0;
				  })
				: state.products.sort((a, b) => {
						if (a.title > b.title) {
							return -1;
						}
						if (b.title > a.title) {
							return 1;
						}
						return 0;
				  });
		},
		orderByPrice: (state, action) => {
			action.payload === "-price"
				? state.products.sort((a, b) => {
						if (a.price === b.price) {
							return 0;
						}
						if (a.price < b.price) {
							return -1;
						}
						return 1;
				  })
				: state.products.sort((a, b) => {
						if (a.price === b.price) {
							return 0;
						}
						if (a.price < b.price) {
							return 1;
						}
						return -1;
				  });
		},
		filterByCategories: (state, action) => {
			let categoryFilter =
				action.payload === "all"
					? state.products
					: state.products.filter(
							(c) => c.category.toLowerCase() === action.payload
					  );
			state.products = categoryFilter;
		},
		filterByMaterial: (state, action) => {
			let materialFilter =
				action.payload === "all"
					? state.products
					: state.products.filter((c) => c.material === action.payload);
			state.products = materialFilter;
		},
<<<<<<< HEAD
		getProductByName: (state, action) => {
			state.products = action.payload;
		},
=======
		addProductCart: (state, action) => {
			state.cart = [...state.cart, action.payload]
		}
>>>>>>> e51add4f849913de6e0c3e5d70c25f82c955a546
	},
});

export const {
	getAllProducts,
	getProductsDetail,
	orderByName,
	orderByPrice,
	filterByCategories,
	filterByMaterial,
<<<<<<< HEAD
	getProductByName,
=======
	addProductCart
>>>>>>> e51add4f849913de6e0c3e5d70c25f82c955a546
} = productsSlice.actions;

export default productsSlice.reducer;
