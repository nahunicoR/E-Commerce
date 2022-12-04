import React from "react";
import {
	GridItem,
	Heading,
	Image,
	Stack,
	Text,
	Flex,
	Button,
	Tag,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CardProduct({ id, img, name, price, category }) {
	return (
		<>
			<GridItem colSpan={1} rowSpan={1}>
				<Card
					transition={"0.2s"}
					h={"400"}
					_hover={{
						boxShadow: "0 10px 18px 0 rgba(0, 0, 0, 0.2)",
						transform: "scale(1.02)",
					}}
					overflow={"hidden"}
				>
					<CardBody>
						<Image
							alignSelf={"center"}
							boxSize="200px"
							objectFit="cover"
							src={img}
							alt="product show"
							borderRadius={"lg"}
						/>
						<Stack spacing={"3"}>
							<Heading overflow={"hidden"} size={"md"}>
								{name}
							</Heading>
							{/* <Text size={"sm"}>{description}</Text> */}
							<Tag w={"fit-content"}>{category}</Tag>
						</Stack>
					</CardBody>
					<CardFooter>
						<Flex flexDirection={"row"} gap={"6"} alignItems={"flex-start"}>
							<Text color="teal" fontSize="2xl">
								{"$ " + price}
							</Text>
							<Link to={`/detail/${id}`}>
								<Button colorScheme={"teal"}>Detalle</Button>
							</Link>
						</Flex>
					</CardFooter>
				</Card>
			</GridItem>
		</>
	);
}
