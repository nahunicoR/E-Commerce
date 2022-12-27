import { useEffect } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import PayButton from './PayButton.jsx';
import {useAuth0} from '@auth0/auth0-react';
import {
	Box,
	Stack,
	Heading,
	/*  Flex, */ 
	Text,
	HStack,
} from "@chakra-ui/react";

export function formatPrice(value, opts = {}) {
	const { locale = "en-US", currency = "USD" } = opts;
	const formatter = new Intl.NumberFormat(locale, {
		currency,
		style: "currency",
		maximumFractionDigits: 2,
	});
	return formatter.format(value);
}

export default function Cart() {
	const {isAuthenticated} = useAuth0()
	const productsInCart = useSelector((state) => state.products.cart);
	console.log(productsInCart);

	let total = 0;
	productsInCart.map((product) => {
		total = total + product.price;
		return total;
	});
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(productsInCart));
	}, [productsInCart]);
	return (
		<div>
			<Box
				maxW={{ base: "3xl", lg: "5xl" }}
				mx="auto"
				px={{ base: "4", md: "8", lg: "12" }}
				py={{ base: "6", md: "8", lg: "12" }}
			>
				<HStack alignItems={"flex-start"}>
					<Stack spacing={{ base: "8", md: "10" }} flex="2">
						<Heading fontSize="2xl" fontWeight="extrabold">
							Carrito de Compras ({productsInCart.length} Productos)
						</Heading>

						<Stack spacing="6">
							{productsInCart?.map((item) => (
								<CartItem key={item.id} {...item} />
							))}
						</Stack>
					</Stack>
					{/* -----checkout------- */}
					<HStack alignItems={"flex-start"} width={250}>
						<Stack spacing="8" rounded="lg" padding="8" width="full">
							<Heading size="md">Resumen del Pedido</Heading>
							<Stack spacing="6">
								<Stack justify="space-between" textAlign={"right"}>
									<Text fontSize="lg" fontWeight="semibold">
										Total
									</Text>
									<Text fontSize="xl" fontWeight="extrabold">
										{formatPrice(total)}
									</Text>
								</Stack>
							</Stack>
							{ isAuthenticated ? <PayButton productsInCart={productsInCart}/> :
							<Text fontSize="lg" fontWeight="semibold">
							Registrate para poder pagar por tus productos!
							</Text>
							}
						</Stack>
					</HStack>
				</HStack>
			</Box>
		</div>
	);
}
