import React from "react";
import orders from "../odersMock.js";
import {
	HiOutlineChevronDoubleLeft,
	HiOutlineChevronDoubleRight,
} from "react-icons/hi";
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
	IconButton,
} from "@chakra-ui/react";

export default function UserDashboard() {
	const { user } = useAuth0();
	const navigate = useNavigate();

	const slideRight = () => {
		var slider = document.getElementsByClassName("css-1peemgu");
		console.log(slider);
		slider.scrollRight = slider.scrollRight + 500;
	};
	const slideLeft = () => {
		var slider = document.getElementsByClassName("css-1peemgu");
		console.log(slider);

		slider.scrollLeft = slider.scrollLeft + 500;
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
					<Flex gap={"9"} flexDir={"row"}>
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
					<Heading>info1</Heading>
					<Heading>info 2</Heading>
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
					gap={5}
					overflow={"hidden"}
				>
					<Heading alignSelf={"flex-start"} size={"md"}>
						My Orders
					</Heading>
					<Flex
						gap={5}
						flexDirection={"row"}
						alignSelf={"flex-start"}
						overflowX={"scroll"}
						overflowY={"clip"}
						scrollBehavior={"smooth"}
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
									<Image src={o.image} />
								</Box>
							);
						})}
					</Flex>
					<Flex gap={3}>
						<IconButton
							onClick={slideLeft}
							icon={<HiOutlineChevronDoubleLeft />}
						/>
						<IconButton
							onClick={slideRight}
							icon={<HiOutlineChevronDoubleRight />}
						/>
					</Flex>
				</Flex>
			</Box>
		</>
	);
}
