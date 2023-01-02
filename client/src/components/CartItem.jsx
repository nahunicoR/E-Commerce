import { formatPrice } from "./Cart";
import { useDispatch } from "react-redux";
import { Button, Box, Stack, Text, Image } from "@chakra-ui/react";
import { deleteProductsCart, deleteQuantityCard } from "../redux/actions";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md"
import { addProductsCart } from "../redux/actions";

export default function CartItem(props) {
	const dispatch = useDispatch();
	const { id, title, image, price, quantity, stock } = props;
	let arrowCenter = 2.5
	if(quantity > 9) arrowCenter=4.5
	return (
		<div>
			<Stack
				direction="row"
				spacing="5"
				width="full"
				border="1px solid #eee"
				shadow={"md"}
				padding={"1rem"}
				justifyContent={"space-between"}
			>
				<Image
					rounded="lg"
					width="140px"
					height="120px"
					fit="contain"
					src={image}
					alt={title}
					draggable="false"
					loading="lazy"
				/>
				<Box pt="4">
					<Stack spacing="0.5">
						<Text fontWeight="medium" fontSize={"1.1rem"}>
							{title}
						</Text>
						<Box
							color={("gray.400", "gray.800")}
							fontSize="2xl"
							paddingTop={"2rem"}
							display={"flex"}
							>
							{formatPrice(price)} x {quantity}
							<Stack position={"relative"}>
								<Box position={"absolute"} right={-arrowCenter} top={-3} fontSize={"2rem"} color="#9aa0a6" cursor={"pointer"} >
									<Text _hover={{ color: "teal.500"  }}><MdArrowDropUp onClick={() => quantity < stock ? dispatch(addProductsCart(props)): null}/></Text>
									<Text _hover={{ color: "teal.500"  }}><MdArrowDropDown onClick={() => quantity > 1 ? dispatch(deleteQuantityCard(props)): null}/></Text>
								</Box>
							</Stack>
						</Box>	
							 
					</Stack>
				</Box>
				<Button
					colorScheme={"teal"}
					marginTop={"10"}
					marginLeft={"7"}
					onClick={() => {
						dispatch(deleteProductsCart(id));
					}}
				>
					Delete
				</Button>
			</Stack>
		</div>
	);
}
