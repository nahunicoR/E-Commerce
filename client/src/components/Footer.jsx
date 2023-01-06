import React from "react";
import logo from "../assets/LogoTo-Mate.png";
import { ButtonGroup, Flex, IconButton, Image, Text } from "@chakra-ui/react";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
	return (
		<>
			<Flex
				padding={"25"}
				w={"100%"}
				h={"auto"}
				position={"relative"}
				bottom={"-450"}
				bg={"teal"}
				flexDirection={"column"}
			>
				<Flex
					bg={"teal"}
					alignItems={"center"}
					flexDirection={"row"}
					justifyContent={"space-between"}
				>
					<Image w={"100px"} src={logo} alt={"ecommerce-logo"} />
					<ButtonGroup size={"lg"} variant="ghost">
						<IconButton
							as="a"
							href="#"
							aria-label="LinkedIn"
							icon={<FaLinkedin fontSize="1.25rem" />}
						/>
						<IconButton
							as="a"
							href="#"
							aria-label="GitHub"
							icon={<FaGithub fontSize="1.25rem" />}
						/>
						<IconButton
							as="a"
							href="#"
							aria-label="Twitter"
							icon={<FaTwitter fontSize="1.25rem" />}
						/>
					</ButtonGroup>
				</Flex>
				<Text textAlign={"center"} bg={"teal"} fontSize="sm">
					&copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
					reserved.
				</Text>
			</Flex>
		</>
	);
}

export default Footer;

/*
<ButtonGroup variant="ghost">
						<IconButton
							as="a"
							href="#"
							aria-label="LinkedIn"
							icon={<FaLinkedin fontSize="1.25rem" />}
						/>
						<IconButton
							as="a"
							href="#"
							aria-label="GitHub"
							icon={<FaGithub fontSize="1.25rem" />}
						/>
						<IconButton
							as="a"
							href="#"
							aria-label="Twitter"
							icon={<FaTwitter fontSize="1.25rem" />}
						/>
					</ButtonGroup>

<Text fontSize="sm" color="subtle">
					&copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
					reserved.
				</Text>


*/
