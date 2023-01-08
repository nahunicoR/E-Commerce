import React, { useState } from "react";
import {
	Flex,
	Heading,
	Box,
	Image,
	HStack,
	IconButton,
	Text,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProductCarousel({ label, array = [] }) {
	const scrollIndex = 1270;
	const productsLength = (array.length - 10) * 255;
	const [scroll, setScroll] = useState(0);

	const slideRight = () => {
		return scroll <= -productsLength
			? null
			: setScroll((state) => state - scrollIndex);
	};
	const slideLeft = () => {
		return scroll === 0 ? null : setScroll((state) => state + scrollIndex);
	};

	const styleSlide = {
		display: "flex",
		padding: "25px",
		scrollBehavior: "smooth",
		transform: `translateX(${scroll}px)`,
		marginLeft: `${array.length === 0 ? "inherit" : "auto"}`,
		columnGap: "15px",
		transition: "transform 330ms ease-in-out",
	};
	return (
		<>
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
					{label}
				</Heading>
				<div className="inner" style={styleSlide}>
					{array.length !== 0 ? (
						array.map((o) => {
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
						})
					) : (
						<Flex justifyContent={"center"}>
							<Text textAlign={"center"} fontWeight={"bold"} color={"gray.400"}>
								Aún no hay articulos.
							</Text>
						</Flex>
					)}
				</div>

				{array.length === 0 ? null : (
					<HStack pt={3}>
						<IconButton icon={<FaChevronLeft />} onClick={slideLeft} />

						<IconButton icon={<FaChevronRight />} onClick={slideRight} />
					</HStack>
				)}
			</Flex>
		</>
	);
}

export default ProductCarousel;
