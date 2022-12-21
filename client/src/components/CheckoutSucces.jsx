import React from 'react';
import logo from "../assets/LogoTo-Mate.png";
import { Text, Stack,Container, Card, Image, HStack } from '@chakra-ui/react';


const CheckoutSucces = () => {
  return (
    <Card bg='gray.200'>
    <Stack>
    <HStack>
        <Container maxW='md' bg='gray.200' color='black'>
                <Text fontSize='4xl' as='b' color='black' textAlign='center'> Su pago ha sido: </Text>
                <Text fontSize='50px' color='green.600'>Exitoso!!</Text>
                <Image src={logo} alt="page logo" w={"250px"}/>
        </Container>
    </HStack>
    </Stack>
</Card>    
  )
}

export default CheckoutSucces