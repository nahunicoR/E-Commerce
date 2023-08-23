import React, { useEffect, useState } from "react";
import {
	Flex,
	Heading,
	Button,
	Image,
	Text,
	IconButton,
	useColorMode,
} from "@chakra-ui/react";
import { FaUser, FaShoppingCart, FaMoon, FaSun } from "react-icons/fa";
import { AiOutlinePoweroff } from "react-icons/ai";
import logo from "../assets/LogoTo-Mate.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { getUseremail, postUser } from "../redux/actions";
import axios from "axios";

export default function Nav() {
	const { colorMode, toggleColorMode } = useColorMode();
	const [admin, setAdmin] = useState({});
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		dispatch(postUser(user));
	// 		dispatch(getUseremail(user.email));
	// 	}
	// }, [dispatch]);

	// useEffect(() => {
	// 	axios(`/user/one?mail=${user?.email}`).then((res) => {
	// 		console.log(res.data);
	// 		setAdmin(res.data);
	// 	});
	// }, [user]);

	const QuantityOfProduct = useSelector((state) => state.products.cart);
	const QuantityFavorites = useSelector((state) => state.products.favorites);
	let topCenter = 4;
	let leftCenter = 2.5;
	let size = "larger";
	if (QuantityOfProduct.length > 9) {
		topCenter = 3;
		leftCenter = 1;
		size = "md";
	}
	return (
		<>
			<Flex
				bg="teal"
				width="100%"
				h="85"
				alignItems={"center"}
				justifyContent="space-around"
				flexDirection={"row"}
			>
				<Flex
					paddingLeft={"5"}
					paddingBottom={"2"}
					flexDirection={"row"}
					w={"50%"}
					alignItems="center"
				>
					<Image src={logo} alt="page logo" w={"80px"} />
					<Heading color="white">
						<Link to="/home">TO-MATE!</Link>
					</Heading>
				</Flex>

				<Flex justifyContent={"space-evenly"} w={"45%"}>
					<IconButton
						icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
						variant={"ghost"}
						fontSize={"xl"}
						onClick={toggleColorMode}
						rounded={"full"}
					/>
					{/* <Button
						onClick={!isAuthenticated ? () => loginWithRedirect() : null}
						fontSize={"lg"}
						color={"white"}
						bg={"transparent"}
						_hover={{
							bg: "blue.500",
							borderColor: "blue.500",
						}}
						leftIcon={<FaUser />}
					>
						{isAuthenticated ? (
							<Link to={"/dashboard"}>{user.name}</Link>
						) : (
							"Iniciar Sesion"
						)}
					</Button> */}

					{/* {isAuthenticated ? (
						<IconButton
							fontSize={"2xl"}
							rounded={"full"}
							variant={"ghost"}
							color={"yellow.500"}
							icon={<AiOutlinePoweroff />}
							onClick={() =>
								logout({ returnTo: window.location.origin + "/home" })
							}
						/>
					) : null} */}

					<Flex
						alignItems={"center"}
						paddingRight={"1.5"}
						position={"relative"}
					>
						{QuantityOfProduct.length ? (
							<Text
								position={"absolute"}
								top={-topCenter}
								left={leftCenter}
								fontSize={size}
								color={"white"}
								fontWeight={"bold"}
							>
								{QuantityOfProduct.length}
							</Text>
						) : null}
						<Link to={"/cart"}>
							<FaShoppingCart color="white" fontSize={"1.5rem"} />
						</Link>
						<Link to={"/favorites"}>
							<Button
								bg={"transparent"}
								variant={"unstyled"}
								margin={"0 1rem 0 1rem"}
							>
								{!QuantityFavorites.length ? (
									<MdOutlineFavoriteBorder
										fontSize={"1.8rem"}
										color={"white"}
									/>
								) : (
									<MdOutlineFavorite fontSize={"1.8rem"} color={"white"} />
								)}
							</Button>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
