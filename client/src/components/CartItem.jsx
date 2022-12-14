import { formatPrice } from "./Cart";
import { useDispatch } from "react-redux";
import { deleteProductsCart } from "../redux/actions";
import { Box, Stack, Text, Image, Button } from "@chakra-ui/react";

export default function CartItem(props) {
	const dispatch = useDispatch();
	const { id, title, image, price /* , quantity */ } = props;
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
						<Text
							color={("gray.400", "gray.800")}
							fontSize="2xl"
							paddingTop={"2rem"}
						>
							{formatPrice(price)}
						</Text>
					</Stack>
				</Box>
				<Box p={"5"}>
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
				</Box>
			</Stack>
		</div>
	);
}
