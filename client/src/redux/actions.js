import { getAllProducts } from "./reducer"

export const getProducts = () => (dispatch) => {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => res.json())
    .then(resp => dispatch(getAllProducts(resp)))
    .catch(e=>console.log(e))
      
}