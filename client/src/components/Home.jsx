import React, { useEffect, useState } from "react";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import axios from "axios";
import CardProduct from "./CardProduct";

export default function Home() {

	/* const products = [
		{
			id: 1,
			title: "Mate Camionero",
			price: "$12.99",
			category: "Mates",
			description: "Mate mediano, adecuado para entusiastas",
			image:
				"https://http2.mlstatic.com/D_NQ_NP_2X_793672-MLA51232459545_082022-F.webp",
		},
	]; */
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("https://fakestoreapi.com/products?limit=9")
			.then((res) => res.data)
			.then((data) => setProducts(data));
	});
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
					filter
				</GridItem>

				{products ? (
					products.map((p) => {
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
			</Grid>
		</>
	);

}
