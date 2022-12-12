import {
	getAllProducts,
	getProductsDetail,
	orderByName,
	orderByPrice,
	filterByCategories,
	filterByMaterial,
	getProductByName,
	addProductCart,
	deleteProductCart,
} from "./reducer";
import axios from "axios";

export const getProducts = () => (dispatch) => {
	fetch("https://e-commerce-production-d476.up.railway.app/products")
		.then((res) => res.json())
		.then((resp) => dispatch(getAllProducts(resp)))
		.catch((e) => console.log(`Error:${e}`));
};

export const postProducts = (productInfo) => async (dispatch) => {
	let post = await axios.post(
		"https://e-commerce-production-d476.up.railway.app/product",
		productInfo
	);
	return post;
};

export const getDetails = (id) => async (dispatch) => {
	try {
		let detail = await axios.get(
			`https://e-commerce-production-d476.up.railway.app/product/${id}`
		);
		return dispatch(getProductsDetail(detail.data));
	} catch (error) {
		console.log(error);
	}
};
export const searchProduct = (query) => async (dispatch) => {
	try {
		let search = await axios.get(
			`https://e-commerce-production-d476.up.railway.app/product?title=${query}`
		);

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
