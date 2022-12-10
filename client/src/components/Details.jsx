import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions";
import { Link, useParams } from "react-router-dom";
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
} from "@chakra-ui/react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";

export default function Details(props) {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const productId = useSelector((state) => state.products.productsDetail);
	/* console.log("product id"); */

	useEffect(() => {
		dispatch(getDetails(id));
		setTimeout(() => {
			setLoading(false);
		}, 800);
	}, [dispatch, id]);

	return (
		/* productId.length === 0 ? (
				<div className={styles.detailPage}>
					(<Loading loading={loading} setLoading={setLoading} />)
				</div> */
		<>
			{!loading ? (
				<Flex flexDirection={"column"} p="50">
					<Link to="/home">
						<Button
							leftIcon={<FaArrowLeft />}
							alignSelf={"flex-start"}
							colorScheme={"teal"}
						>
							Volver
						</Button>
					</Link>
					<Box
						borderWidth="1px"
						borderRadius="lg"
						w="50%"
						h={"600"}
						alignSelf={"center"}
					>
						<Flex
							flexDirection={"row"}
							justifyContent={"space-evenly"}
							alignItems={"center"}
						>
							<Flex margin={30} w={"50%"} h={"500"}>
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
									<Tag w={"fit-content"}>{productId.category}</Tag>
								</HStack>
								<Heading size={"sm"}>Descripción:</Heading>
								<Text>{productId.description}</Text>
								<Heading size={"sm"}>Precio:</Heading>
								<Text color="teal" fontSize="3xl">
									$ {productId.price}
								</Text>
								<Heading size={"sm"}>Material</Heading>
								<Tag colorScheme={"teal"} variant={"outline"} w={"fit-content"}>
									{productId.material}
								</Tag>
								<Flex
									gap={3}
									flexDirection={"row"}
									justifyContent={"center"}
									alignItems={"center"}
									marginTop={50}
								>
									<Button w={"60%"} colorScheme={"teal"}>
										Añadir al Carrito
									</Button>
									<IconButton icon={<FaHeart />} />
								</Flex>
							</Flex>
						</Flex>
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
