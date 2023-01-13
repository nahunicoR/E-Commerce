import { Button, GridItem, HStack } from "@chakra-ui/react";
import React from "react";

function Pagination({ productsPerPage, allProducts, pagination }) {
	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(allProducts / productsPerPage); i++) {
		pageNumbers.push(i + 1);
	} //"1295px"
	return (
		<GridItem
			position={"absolute"}
			top={"1500"}
			left={{ base: "null", lg: "950px", xl: "52%" }}
			gridArea={"pag"} /* bg={"red.100"} */
		>
			<HStack alignItems={"center"} justifyContent={"center"} padding={"10"}>
				{pageNumbers
					? pageNumbers.map((number) => (
							<Button
								colorScheme={"teal"}
								variant={"outline"}
								key={number}
								onClick={() => pagination(number)}
							>
								{number}
							</Button>
					  ))
					: null}
			</HStack>
		</GridItem>
	);
}

export default Pagination;
