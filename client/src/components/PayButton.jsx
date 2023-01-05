import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const PayButton = ({ productsInCart }) => {
	const { user } = useAuth0();

	const handleCheckout = () => {
		console.log(productsInCart, user);
	};
	

	return (
		<Button
			colorScheme="teal"
			size="lg"
			fontSize="md"
			rightIcon={<FaArrowRight />}
			onClick={() => handleCheckout()}
		>
			Pagar
		</Button>
	);
};
export default PayButton;
