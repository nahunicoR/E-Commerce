import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

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
				<Flex w={"75%"}>
					<Heading color="white" px="8">
						TO-MATE
					</Heading>
				</Flex>

				<Flex justifyContent={"space-around"} w={"25%"}>
					<Button fontSize={"xl"} color={"white"} variant="link">
						<Link to={"/create"}>Crear Producto</Link>
					</Button>
					<Button
						onClick={() => loginWithRedirect()}
						fontSize={"xl"}
						color={"white"}
						bg={"transparent"}
						_hover={{
							bg: "blue.500",
							borderColor: "blue.500",
						}}
						leftIcon={<FaUser />}
					>

						{isAuthenticated ? user.name : "Iniciar Sesion"}
					</Button>

					{isAuthenticated ? (
						<Button
							fontSize={"xl"}
							colorScheme={"red"}
							leftIcon={<BiLogOut />}
							onClick={() => logout({ returnTo: window.location.origin })}
						></Button>
					) : null}

				</Flex>
			</Flex>
		</>
	);
}
