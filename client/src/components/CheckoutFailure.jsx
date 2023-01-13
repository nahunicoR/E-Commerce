import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoTo-Mate.png";
import { Text, Container, Image, HStack, Flex, Button } from "@chakra-ui/react";

const CheckoutFailure = () => {
	const navigate = useNavigate();

	return (
		<>
			<Flex h={"1000"} justifyContent={"center"} bg={"red.500"}>
				<HStack>
					<Container
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						maxW="md"
						color="black"
					>
						<Text fontSize="4xl" as="b" color="white" textAlign="center">
							Ups!! Aquí hay algo mal, que no esta bien
						</Text>
						<Text
							textAlign={"center"}
							fontSize="80px"
							fontStyle={"normal"}
							color={"white"}
						>
							Pago rechazado
						</Text>
						<Image marginLeft={"5"} src={logo} alt="page logo" w={"250px"} />
						<Button marginTop={"3"} onClick={() => navigate("/")}>
							Intenta de nuevo
						</Button>
					</Container>
				</HStack>
			</Flex>
		</>
	);
};

export default CheckoutFailure;