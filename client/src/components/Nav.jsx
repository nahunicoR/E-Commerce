import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getProducts } from "../redux/actions";


// OJO este useEffect no va aqui es solo para probar
export default function Nav() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getProducts())
	})
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
						Iniciar Sesión
					</Button>
				</Flex>
			</Flex>
		</>
	);
}
