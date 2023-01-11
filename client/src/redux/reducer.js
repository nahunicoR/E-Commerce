import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
		allProducts: [],
		filteredBatch: [],
		productsDetail: {},
		cart: localStorage.hasOwnProperty("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: [],
		reviews: [],
		favorites: localStorage.hasOwnProperty("favorites")
		? JSON.parse(localStorage.getItem("favorites"))
		: [],	
	},
	cart: [],
	reducers: {
		getAllProducts: (state, action) => {
			state.products = action.payload;
			state.allProducts = action.payload;
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
			state.filteredBatch =
				action.payload === "all"
					? state.allProducts
					: state.allProducts.filter(
							(c) => c.category.toLowerCase() === action.payload
					  );
			state.products = state.filteredBatch;
		},
		filterByMaterial: (state, action) => {
			let materialFilter =
				action.payload === "all"
					? state.filteredBatch
					: state.filteredBatch.filter((c) => c.material === action.payload);
			state.products = materialFilter;
		},
		addProductCart: (state, action) => {
			let itemInCart = state.cart.find(
				(product) => product.id === action.payload.id
			);
			return itemInCart
				? {
						...state,
						cart: state.cart.map((product) =>
							product.id === action.payload.id
								? { ...product, quantity: product.quantity + 1 }
								: product
						),
				  }
				: {
						...state,
						cart: [...state.cart, { ...action.payload, quantity: 1 }],
				  };
		},

		getProductByName: (state, action) => {
			state.products = action.payload;
		},

		deleteProductCart: (state, action) => {
			let deleteProduct = state.cart.filter((p) => p.id !== action.payload);
			state.cart = deleteProduct;
		},

		deleteQuantity: (state, action) => {
			let deleteQ = state.cart.find(
				(product) => product.id === action.payload.id
			);
			return deleteQ
				? {
						...state,
						cart: state.cart.map((product) =>
							product.id === action.payload.id
								? { ...product, quantity: product.quantity - 1 }
								: product
						),
				  }: null
		},
		reviews: (state, action) => {
			state.reviews = action.payload
		},
		addFavorite: (state, action) => {
			let find = state.favorites.find(f => f.id === action.payload.id)
			if(!find)	state.favorites = [...state.favorites, action.payload]
		},
		deleteFavorite: (state, action) => {
			let deleteProduct = state.favorites.filter((p) => p.id !== action.payload.id);
			state.favorites = deleteProduct;
		},
	},
});

export const {
	getAllProducts,
	getProductsDetail,
	orderByName,
	orderByPrice,
	filterByCategories,
	filterByMaterial,
	addProductCart,
	deleteProductCart,
	getProductByName,
	deleteQuantity,
	reviews,
	addFavorite,
	deleteFavorite,
} = productsSlice.actions;

export default productsSlice.reducer;
