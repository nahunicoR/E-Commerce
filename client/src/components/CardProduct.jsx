import React from "react";
import {
	GridItem,
	Heading,
	Image,
	Stack,
	Text,
	Button,
	Tag,
	Flex,
	Divider,
	HStack,
	useToast,
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductsCart } from "../redux/actions";
/* import { useAuth0 } from "@auth0/auth0-react"; */

export default function CardProduct({
	id,
	img,
	name,
	price,
	category,
	material,
	product,
}) {
	/* const { isAuthenticated } = useAuth0(); */
	const toast = useToast();
	const dispatch = useDispatch();

	return (
		<>
			<GridItem /* colSpan={1} */ gridArea={"card"}>
				<Card
					transition={"0.2s"}
					h={"400"}
					maxW={"400"}
					_hover={{
						boxShadow: "0 10px 18px 0 rgba(0, 0, 0, 0.2)",
						transform: "scale(1.02)",
					}}
					margin={"auto"}
					/* overflow={"hidden"} */
				>
					<CardBody>
						<Flex
							borderRadius={"lg"}
							h={"220"}
							w={"400"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Image
								src={img}
								alt="product show"
								height={"100%"}
								width={"100%"}
								objectFit={"contain"}
							/>
						</Flex>
						<Stack spacing={"3"}>
							<Heading
								whiteSpace={"nowrap"}
								textOverflow={"ellipsis"}
								overflow={"hidden"}
								size={"md"}
							>
								{name}
							</Heading>
							{/* <Text size={"sm"}>{description}</Text> */}
							<HStack>
								<Tag w={"fit-content"}>{category}</Tag>
								<Tag colorScheme={"teal"} variant={"outline"} w={"fit-content"}>
									{material}
								</Tag>
							</HStack>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter alignItems={"center"}>
						<Text marginRight={"13"} color="teal" fontSize="3xl">
							{"$" + price}
						</Text>

						<Link to={`/detail/${id}`}>
							<Button size={"md"} colorScheme={"teal"}>
								Detalle
							</Button>
						</Link>
						<Button
							size={"md"}
							colorScheme={"teal"}
							marginLeft={"1.5"}
							onClick={() => {
								dispatch(addProductsCart(product));
								toast({
									status: "success",
									title: `${name} ha sido agregado a tu carrito!`,
									isClosable: true,
								});
							}}
						>
							+
						</Button>
					</CardFooter>
				</Card>
			</GridItem>
		</>
	);
}
