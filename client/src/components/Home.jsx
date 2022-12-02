import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

export default function Home() {
	const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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
				<GridItem rowSpan={3} colSpan={1} bg="red.600">
					filter
				</GridItem>
				{products.map((p) => {
					return (
						<div key={p.id}>
							<GridItem
								colSpan={1}
								h={"333px"}
								bg={"blue.600"}
								textAlign="center"
							>
								{p}
							</GridItem>
						</div>
					);
				})}
			</Grid>
		</>
	);
}
