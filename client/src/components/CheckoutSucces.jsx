import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoTo-Mate.png";
import { Text, Container, Image, HStack, Flex, Button } from "@chakra-ui/react";
//import { useAuth0 } from "@auth0/auth0-react";

const CheckoutSucces = () => {
	const navigate = useNavigate();

	return (
		<>
			<Flex h={"1000"} justifyContent={"center"} bg={"green.500"}>
				<HStack>
					<Container
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						maxW="md"
						color="black"
					>
						<Text fontSize="4xl" as="b" color="white" textAlign="center">
							Su pago ha sido:
						</Text>
						<Text
							textAlign={"center"}
							fontSize="80px"
							fontStyle={"normal"}
							color={"white"}
						>
							Exitoso
						</Text>
						<Image marginLeft={"5"} src={logo} alt="page logo" w={"250px"} />
						<Button marginTop={"3"} onClick={() => navigate("/")}>
							Volver al comercio
						</Button>
					</Container>
				</HStack>
			</Flex>
		</>
	);
};

export default CheckoutSucces;
