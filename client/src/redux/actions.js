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
	deleteQuantity
} from "./reducer";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
	let products = await axios.get("/products")
	try {
		return dispatch(getAllProducts(products.data))
	} catch (error) {
		console.log(error)
	}
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
export const searchProduct = (query) => async (dispatch) => {
	try {
		let search = await axios.get(`/product?title=${query}`);

		return dispatch(getProductByName(search.data));
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

