import React, { useState } from "react";
import orders from "../odersMock.js";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
	Image,
	Stat,
	StatLabel,
	StatNumber,
	HStack,
	IconButton,
} from "@chakra-ui/react";

export default function UserDashboard() {
	const scrollIndex = 1270;
	const productsLength = (orders.length - 10) * 255;

	const [scroll, setScroll] = useState(0);
	const { user } = useAuth0();
	const navigate = useNavigate();
	const styleSlide = {
		display: "flex",
		padding: "25px",
		scrollBehavior: "smooth",
		transform: `translateX(${scroll}px)`,
		marginLeft: "auto",
		columnGap: "15px",
		transition: "transform 330ms ease-in-out",
	};

	const slideRight = () => {
		return scroll <= -productsLength
			? null
			: setScroll((state) => state - scrollIndex);
	};
	const slideLeft = () => {
		return scroll === 0 ? null : setScroll((state) => state + scrollIndex);
	};

	return (
		<>
			<Box
				gap={3}
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				h={"100%"}
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
								{user.email_verified ? "Verified" : "Unverified"}
							</Tag>
						</Flex>
					</Flex>

					<Flex paddingRight={5}>
						<Stat>
							<StatLabel>Updated at:</StatLabel>
							<StatNumber>{user.updated_at}</StatNumber>
						</Stat>
					</Flex>
				</Flex>

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
					overflow={"hidden"}
				>
					<Heading alignSelf={"flex-start"} size={"md"}>
						Tus Ordenes
					</Heading>
					<div
						className="inner"
						style={styleSlide}
						/* gap={3}
						alignSelf={"flex-start"}
						padding={26}
						flexDirection={"row"}
						scrollBehavior={"smooth"} */
					>
						{orders.map((o) => {
							return (
								<Box
									display={"flex"}
									alignItems={"center"}
									padding={"8"}
									border={"1px"}
									borderColor={"gray.200"}
									borderRadius={"md"}
									h={"230px"}
									w={"230px"}
									bg={"white"}
								>
									<Image
										height={"100%"}
										width={"100%"}
										objectFit={"contain"}
										src={o.image}
									/>
								</Box>
							);
						})}
					</div>
					<HStack>
						<IconButton icon={<FaChevronLeft />} onClick={slideLeft} />

						<IconButton icon={<FaChevronRight />} onClick={slideRight} />
					</HStack>
				</Flex>
				<Flex
					alignSelf={"center"}
					justifyContent={"space-between"}
					w={"70%"}
					h={"200"}
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
				</Flex>
				<Flex
					alignSelf={"center"}
					justifyContent={"space-between"}
					w={"70%"}
					h={"200"}
					flexDirection={"column"}
					padding={"8"}
					border={"1px"}
					borderColor={"gray.200"}
					borderRadius={"md"}
					bg={"white"}
					alignItems={"center"}
				>
					<Heading alignSelf={"flex-start"} size={"md"}>
						Tus Favoritos
					</Heading>
				</Flex>
			</Box>
		</>
	);
}
