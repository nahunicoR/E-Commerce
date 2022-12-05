import { getAllProducts, getProductsDetail } from "./reducer";
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
