import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
	const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

	const logoutBtn = (
		<Button
			fontSize={"xl"}
			color={"white"}
			bg={"transparent"}
			border={"1px solid white"}
			_hover={{
				bg: "blue.500",
				border: "1px solid",
				borderColor: "blue.500",
			}}
			onClick={() => logout({ returnTo: window.location.origin })}
		>
			Log Out
		</Button>
	);
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
						border={"1px solid white"}
						_hover={{
							bg: "blue.500",
							border: "1px solid",
							borderColor: "blue.500",
						}}
						leftIcon={<FaUser />}
					>
						{isAuthenticated ? user : "Iniciar Sesion"}
					</Button>
					{isAuthenticated ? logoutBtn : null}
				</Flex>
			</Flex>
		</>
	);
}
