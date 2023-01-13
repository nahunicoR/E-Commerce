import {
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
	getUser,
	getOrderByUser,
} from "./reducer";
import axios from "axios";

export const getUseremail = (user) => async (dispatch) => {
	return dispatch(getUser(user));
};

export const getProducts = () => async (dispatch) => {
	let products = await axios.get("/products");
	try {
		return dispatch(getAllProducts(products.data));
	} catch (error) {
		console.log(error);
	}
};

export const postUser = (authUser) => async (dispatch) => {
	let dbUser = await axios.post("user", authUser);
	return dbUser;
};

export const postProducts = (productInfo) => async (dispatch) => {
	let post = await axios.post("/product", productInfo);
	return post;
};

export const getDetails = (id) => async (dispatch) => {
	try {
		let detail = await axios.get(`/product/${id}`);
		return dispatch(getProductsDetail(detail.data));
	} catch (error) {
		console.log(error);
	}
};

export const getUsers = () => async (dispatch) => {
	try {
		let users = await axios.get("/users/all");
		return dispatch(getUser(users.data));
	} catch (error) {
		console.log(error);
	}
};
export const searchProduct = (query) => async (dispatch) => {
	try {
		let search = await axios.get(`/product?title=${query}`);

		return dispatch(getProductByName(search.data));
	} catch (error) {
		console.log(error);
	}
};

export const getOrders = (email) => async (dispatch) => {
	try {
		let orders = await axios.get(`/order/${email}/orders`);
		return dispatch(getOrderByUser(orders.data));
	} catch (error) {
		console.log(error);
	}
};
export const orderByNames = (filter) => (dispatch) => {
	return dispatch(orderByName(filter));
};

export const orderByPrices = (filter) => (dispatch) => {
	return dispatch(orderByPrice(filter));
};
export const filterByCategory = (filter) => (dispatch) => {
	return dispatch(filterByCategories(filter));
};
export const filterByMaterials = (filter) => (dispatch) => {
	return dispatch(filterByMaterial(filter));
};

export const addProductsCart = (product) => (dispatch) => {
	return dispatch(addProductCart(product));
};
export const deleteProductsCart = (product) => (dispatch) => {
	return dispatch(deleteProductCart(product));
};
export const deleteQuantityCard = (product) => (dispatch) => {
	return dispatch(deleteQuantity(product));
};
export const getReviews = (id) => async (dispatch) => {
	let reviewsResponse = await axios.get(`/reviews/${id}`);
	// console.log(reviewsResponse)
	try {
		return dispatch(reviews(reviewsResponse.data));
	} catch (error) {
		console.log(error);
	}
};

export const postReview = (reviewInfo) => async (dispatch) => {
	let post = await axios.post("/review", reviewInfo);
	//console.log(reviewInfo)
	return post.data;
};

export const addFavorites = (product) => (dispatch) => {
	return dispatch(addFavorite(product));
};
export const deleteFavorites = (product) => (dispatch) => {
	return dispatch(deleteFavorite(product));
};
