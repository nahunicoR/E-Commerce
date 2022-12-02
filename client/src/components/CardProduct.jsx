import React from "react";
import { GridItem, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";

export default function CardProduct({ img, name, price, description }) {
	return (
		<>
			<GridItem colSpan={1} h={"333px"} bg={"blue.600"} textAlign="center">
				<Card maxW={"container.sm"}>
					<Image src={img} alt="product show" borderRadius={"md"} />
					<Stack spacing={"2"}>
						<Heading size={"md"}>{name}</Heading>
						<Text size={"sm"}>{description}</Text>
						<Text color="teal" fontSize="2xl">
							{price}
						</Text>
					</Stack>
				</Card>
			</GridItem>
		</>
	);
}
