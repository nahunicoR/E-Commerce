import React from "react";
import { Flex, Heading, Button, Image } from "@chakra-ui/react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import logo from "../assets/LogoTo-Mate.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
	const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

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
						<Button
							fontSize={"lg"}
							colorScheme={"red"}
							leftIcon={<BiLogOut />}
							onClick={() =>
								logout({ returnTo: window.location.origin + "/home" })
							}
						></Button>
					) : null}

					<Flex
						alignItems={"center"}
						paddingRight={"1.5"}
						position={"relative"}
					>
						<Link to={"/cart"}>
							<FaShoppingCart color="white" fontSize={"1.5rem"} />
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
