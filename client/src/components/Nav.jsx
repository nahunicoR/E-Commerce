import React from "react";
import {
	Flex,
	Heading,
	Button,
	Image,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { AiOutlinePoweroff } from "react-icons/ai";
import logo from "../assets/LogoTo-Mate.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

export default function Nav() {
	const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
	const QuantityOfProduct = useSelector((state) => state.products.cart);
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
					w={"75%"}
					alignItems="center"
				>
					<Image src={logo} alt="page logo" w={"80px"} />
					<Heading color="white">
						<Link to="/home">TO-MATE!</Link>
					</Heading>
				</Flex>

				<Flex justifyContent={"space-evenly"} w={"25%"}>
					<Button fontSize={"lg"} color={"white"} variant="link">
						<Link to={"/create"}>Crear Producto</Link>
					</Button>
					<Button
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
					</Button>

					{isAuthenticated ? (
						<IconButton
							fontSize={"lg"}
							rounded={"full"}
							colorScheme={"red"}
							icon={<AiOutlinePoweroff />}
							onClick={() =>
								logout({ returnTo: window.location.origin + "/home" })
							}
						/>
					) : null}

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
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
