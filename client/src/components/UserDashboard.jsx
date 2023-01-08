import React from "react";
import orders from "../odersMock.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Avatar,
	Box,
	Flex,
	Heading,
	Text,
	Tag,
	Stat,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import ProductCarousel from "./ProductCarousel.jsx";
/* import { useApi } from "../hooks/useApi.jsx"; */

export default function UserDashboard() {
	const { user /* getAccessTokenSilently */ } = useAuth0();
	const navigate = useNavigate();
	const options = {
		weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
	};

	const updatedAt = new Date(user.updated_at).toLocaleDateString(
		"es-ES",
		options
	);

	//Llamado a un endpoint de nuestra api para corroborar permisos del usuario
	/* 	const opts = {
		audience: 'e-commercetomate',
		scope: 'read:dashboard',
	  };
	  const { login, getAccessTokenWithPopup } = useAuth0();
	  const {
		loading,
		error,
		refresh,
		data: users,
	  } = useApi('', opts); */

	return (
		<>
			<Box
				gap={3}
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				h={"100%"}
				pb={"60px"}
			>
				<Button
					w={"fit-content"}
					m={"9"}
					colorScheme={"teal"}
					onClick={() => navigate(-1)}
				>
					volver
				</Button>

				<Flex
					alignSelf={"center"}
					justifyContent={"space-between"}
					w={"70%"}
					h={"10%"}
					/* bg={"red.100"} */
					padding={"5"}
					border={"1px"}
					borderColor={"gray.200"}
					borderRadius={"md"}
					bg={"white"}
					alignItems={"center"}
				>
					<Flex paddingLeft={5} gap={"9"} flexDir={"row"}>
						<Avatar
							size={"2xl"}
							name={user.name}
							src={user.picture}
							alt="profile-snippet"
						/>

						<Flex gap={3} flexDirection={"column"}>
							<Heading>{user.name}</Heading>
							<Text color={"gray.400"}>{user.email}</Text>
							<Tag
								colorScheme={user.email_verified ? "green" : null}
								w={"fit-content"}
							>
								{user.email_verified ? "Verificado" : "Sin Verificar"}
							</Tag>
						</Flex>
					</Flex>

					<Flex paddingRight={5}>
						<Stat>
							<StatLabel>Ultima Actualizacion:</StatLabel>
							<StatNumber>{updatedAt}</StatNumber>
						</Stat>
					</Flex>
				</Flex>
				<ProductCarousel label={"Tus Ordenes"} array={orders} />
				<ProductCarousel label={"Tus Favoritos"} />
				<Flex
					alignSelf={"center"}
					justifyContent={"space-between"}
					w={"70%"}
					h={"fit-content"}
					flexDirection={"column"}
					padding={"8"}
					border={"1px"}
					borderColor={"gray.200"}
					borderRadius={"md"}
					bg={"white"}
					alignItems={"center"}
				>
					<Heading alignSelf={"flex-start"} size={"md"}>
						Tus Comentarios
					</Heading>
					<Flex justifyContent={"center"}>
						<Text fontWeight={"bold"} color={"gray.400"}>
							Aún no hay comentarios.
						</Text>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
