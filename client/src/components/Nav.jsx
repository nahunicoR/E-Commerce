import React from "react";
import { Flex, Heading, Button, IconButton } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

export default function Nav() {
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
				<Heading color="white" px="8">
					TO-MATE
				</Heading>
				<Button colorScheme={"teal"}> Crear Producto</Button>
				<IconButton colorScheme={"teal"} icon={<FaUser />}>
					Iniciar Sesion
				</IconButton>
			</Flex>
		</>
	);
}
