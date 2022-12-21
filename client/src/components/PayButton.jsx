import axios from 'axios';
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import {Button} from "@chakra-ui/react";

const PayButton = ({productsInCart}) => {
    //const user = useSelector((state)=> state.autenticacion de usuario)

    const handleCheckout = () =>{
        console.table(productsInCart)
        axios.post(`http://localhost:3001/stripe/create-checkout-session`, {
            productsInCart,
            //userId: user.id
        })
    }

  return (
        <Button
            colorScheme="teal"
            size="lg"
            fontSize="md"
            rightIcon={<FaArrowRight />}
            onClick={()=>handleCheckout()}
        >
            Pagar
        </Button>
  )
}
export default PayButton;
