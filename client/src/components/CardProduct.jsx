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
	IconButton,
	 useToast, 
} from "@chakra-ui/react";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorites, addProductsCart } from "../redux/actions";
/* import { useAuth0 } from "@auth0/auth0-react"; */
import Rating from "./Rating";
import { FaHeart } from "react-icons/fa"

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
					<Link to={`/detail/${id}`}>
		
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
					
					<CardBody position={"relative"}>
					<IconButton
							onClick={()=> dispatch(addFavorites(product))}
							// color={liked ? "red.400" : null}
							color={"teal"}
							icon={<FaHeart />}
							margin="0 15px"
							position={"absolute"}
							right={0}
							/>
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
							<HStack gap={"0.5rem"}>
								<Tag w={"fit-content"}>{category}</Tag>
								<Tag colorScheme={"teal"} variant={"outline"} w={"fit-content"} >
									{material}
								</Tag>
								<Rating
								productId={id}
								size={"1.2rem"} />
							</HStack>
						</Stack>
					</CardBody>
					<Divider />
					<CardFooter alignItems={"center"}>
						<Text marginRight={"13"} color="teal" fontSize="3xl">
							{"$" + price}
						</Text>

						{/* <Link to={`/detail/${id}`}> */}
							<Button size={"md"} colorScheme={"teal"}>
								Detalle
							</Button>
						{/* </Link> */}
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
			</Link>
		</>
	);
}
