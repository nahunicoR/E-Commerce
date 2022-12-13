import React from 'react'
import logo from "../assets/LogoTo-Mate.png";
import { Text, Stack,Container, Card, Image, HStack } from '@chakra-ui/react';

const Error404 = () => {
  return (
    <Card bg='gray.200'>
        <Stack>
        <HStack>
            <Container maxW='md' bg='gray.200' color='black'>
                    <Text fontSize='6xl' as='b' color='black' textAlign='center'> 404</Text>
                    <Text fontSize='50px' color='tomato'>Page not Found</Text>
                    <Image src={logo} alt="page logo" w={"250px"}/>
            </Container>
        </HStack>
        </Stack>
    </Card>    
  );
};

export default Error404;