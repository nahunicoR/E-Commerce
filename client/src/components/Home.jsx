import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import CardProduct from "./CardProduct";
import Pagination from "./Pagination";
import { getProducts } from "../redux/actions";

export default function Home() {
	const dispatch = useDispatch();

	const products = useSelector((state) => state.products.products);
	console.log(products);

	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 9;
	const indexLastProduct = currentPage * productsPerPage;
	const indexFirstProduct = indexLastProduct - productsPerPage;
	const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
	const pagination = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);
	return (
		<>
			<Grid
				h={"1000px"}
				gridTemplateRows="repeat(3,1fr)"
				gridTemplateColumns="repeat(4,1fr)"
				gap={5}
				padding="10"
				paddingTop={"10"}
			>
				<GridItem borderRadius={"lg"} rowSpan={3} colSpan={1} bg="red.200">
					Filter
				</GridItem>

				{currentProducts ? (
					currentProducts.map((p) => {
						return (
							<div key={p.id}>
								<CardProduct
									id={p.id}
									img={p.image}
									name={p.title}
									price={p.price}
									category={p.category}
								/>
							</div>
						);
					})
				) : (
					<Spinner color="teal" alignSelf={"center"} size={"lg"} />
				)}
				<Pagination
					pagination={pagination}
					productsPerPage={productsPerPage}
					allProducts={products.length}
				/>
			</Grid>
		</>
	);
}
