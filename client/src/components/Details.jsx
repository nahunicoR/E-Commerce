import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, getReviews } from "../redux/actions";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
	Flex,
	HStack,
	Button,
	Tag,
	Box,
	Image,
	Heading,
	Text,
	IconButton,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import Review from "./Review";
import axios from "axios";
import { addProductsCart } from "../redux/actions";
import { addFavorites, deleteFavorites } from "../redux/actions";

export default function Details(props) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { isAuthenticated } = useAuth0();
	const toast = useToast();

	//estados locales
	const [loading, setLoading] = useState(true);
	const [liked, setLiked] = useState(false);

	const productId = useSelector((state) => state.products.productsDetail);
	/* console.log("product id"); */
	// const reviews = useSelector(state => state.products.reviews)
	// console.log(reviews)
	const handleLike = () => {
		if (liked) {
			dispatch(deleteFavorites(productId));
		} else {
			dispatch(addFavorites(productId));
		}
		setLiked(!liked);
	};

	const handleCompra = () => {
		console.log("compra");
		console.log(productId);
		let compra = {
			...productId,
			quantity: 1,
		};
		console.log(compra);
		axios
			.post("/payment", compra)
			.then((res) => (window.location.href = res.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		dispatch(getReviews(id));
		dispatch(getDetails(id));
		setTimeout(() => {
			setLoading(false);
		}, 800);
	}, [dispatch, id]);
	// const reviews = useSelector(state => state.products.reviews)
	return (
		/* productId.length === 0 ? (
				<div className={styles.detailPage}>
					(<Loading loading={loading} setLoading={setLoading} />)
				</div> */
		<>
			{!loading ? (
				<Flex flexDirection={"row"} p="2" justifyContent={"center"}>
					<Box
						borderWidth="3px"
						borderRadius="lg"
						margin="2px"
						w="50%"
						h={"610"}
						alignSelf={"start"}
					>
						<Flex
							flexDirection={"row"}
							justifyContent={"space-evenly"}
							alignItems={"center"}
							position={"relative"}
						>
							<Link to="/home">
								<Button
									leftIcon={<FaArrowLeft />}
									alignSelf={"flex-start"}
									colorScheme={"teal"}
									position={"absolute"}
									top={0}
									margin={"0.5rem"}
								>
									Volver
								</Button>
							</Link>
							<Flex
								flexDirection={"column"}
								alignItems={"center"}
								margin={30}
								w={"50%"}
								h={"500"}
							>
								<Image
									alt="product show"
									height={"100%"}
									width={"100%"}
									objectFit={"contain"}
									src={productId.image}
								/>
							</Flex>
							<Flex
								/* marginTop={-250} */ gap={3}
								flexDirection={"column"}
								w={"50%"}
							>
								<HStack alignItems={"center"} spacing={3}>
									<Flex w={"50"}>
										<Heading objectFit={"contain"} size={"lg"}>
											{productId.title}
										</Heading>
									</Flex>
								</HStack>
								<Heading size={"sm"}>Descripción:</Heading>
								<Text>{productId.description}</Text>
								<Heading size={"sm"}>Precio:</Heading>
								<Text color="teal" fontSize="3xl">
									$ {productId.price}
								</Text>
								<Heading size={"md"}>Material</Heading>
								<Tag colorScheme={"teal"} variant={"outline"} w={"fit-content"}>
									{productId.material}
								</Tag>
								<Heading size={"md"}>Categoria</Heading>
								<Tag size={"md"} w={"fit-content"}>
									{productId.category}
								</Tag>
								<Flex
									gap={3}
									flexDirection={"row"}
									justifyContent={"center"}
									alignItems={"center"}
									marginTop={50}
								></Flex>
							</Flex>
						</Flex>
						<Flex
							flexDirection={"row"}
							p="-10"
							justifyContent={"space-evenly"}
							margin-top="100"
						>
							<Button
								onClick={
									isAuthenticated
										? () => {
												dispatch(addProductsCart(productId));
												toast({
													status: "success",
													title: `${productId.title} ha sido agregado a tu carrito!`,
													isClosable: true,
												});
										  }
										: () => {
												toast({
													title: "Primero inicie sesión",
													position: "bottom",
													status: "info",
													isClosable: true,
												});
										  }
								}
								w={"40%"}
								colorScheme={"teal"}
							>
								Añadir al Carrito
							</Button>
							<IconButton
								onClick={handleLike}
								color={liked ? "red.400" : null}
								icon={<FaHeart />}
								margin="0 15px"
							/>
							{isAuthenticated ? (
								<Button
									onClick={handleCompra}
									w={"40%"}
									colorScheme={"teal"}
									top="85%"
								>
									Comprar
								</Button>
							) : (
								<Button
									onClick={handleCompra}
									w={"40%"}
									colorScheme={"teal"}
									top="85%"
									disabled
								>
									Comprar
								</Button>
							)}
						</Flex>
					</Box>
					<Box
						borderWidth="3px"
						borderRadius="lg"
						margin="2px"
						w="40%"
						h={"610"}
						alignSelf={"start"}
						overflowY={"scroll"}
					>
						<Text
							marginLeft={"1.5rem"}
							fontSize={"1.5rem"}
							fontWeight={"bold"}
							marginTop={"1rem"}
						>
							Opiniones del producto
						</Text>
						<Review productId={productId} />
					</Box>
				</Flex>
			) : (
				<Flex h={"1000px"} justifyContent={"center"} alignItems="center">
					<Spinner color="teal" alignSelf={"center"} size={"xl"} />
				</Flex>
			)}
		</>
	);
}
