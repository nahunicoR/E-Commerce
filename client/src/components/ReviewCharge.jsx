import React from 'react';
import { useState } from 'react';
import { Box , Text, FormControl, FormLabel, Button, Input, FormHelperText, FormErrorMessage, Stack } from '@chakra-ui/react';



const validate = (input) => {
	let errors = {};
	if (!input.description) {
		errors.description = "Este campo es Obligatorio.";
    }else {
        if(input.description.length > 250){
            errors.description = "Solo se permiten hasta 250 caracteres!"
    }
    if(input.rating === null){
        errors.rating = "Éste campo es requerido."
    }
    else if(input.rating < 1 || input.rating > 5){
        errors.rating = "Rating should be between 1 and 5 stars."
    }
}
    return errors;
}

function ReviewCharge() {
    const [input, setInput] = useState({
        description:"",
        rating:""
    })

    const [errors, setErrors] = useState({
        description:"",
        rating:"",
        
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        setInput({
            description:"",
            rating:"",
           })
    }

    const handleChange = (e) => {
        setInput({
			...input,
			[e.target.name]: e.target.value,
		});
        setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
                
			})
		);
    }

    const isError = input.description === '' || input.description > 250

  return (
    <Box
        borderWidth="3px"
        borderRadius="lg"
        margin="2px"
        w="40%"
        h={"610"}
        alignSelf={"start"}
        overflowY={"scroll"}
        >
         <FormControl onSubmit={handleSubmit}>
            <FormLabel>Comentario: </FormLabel>
                <Input 
                type="text" 
                name="description" 
                value={input.description} 
                onChange={handleChange}/>
                {!isError ? (
                    <FormErrorMessage>Este campo es requerido</FormErrorMessage>
      ) : (
        <FormHelperText>
          El comentario no puede estar vacío.
        </FormHelperText>
      )}
        <Stack margin={"2rem"}  >
            <Text fontSize={"1.5rem"} color="teal" >
            {/* [<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>]
            {rating.fill(<span>&#9733;</span>, 0, input.rating)} */}
            </Text>
            <Text>Puntuación:</Text>
            </Stack>
         
            );
    
                <Button
                    // onClick={}
                        w={"40%"}
                        colorScheme={"teal"}
                        top="85%"
                        type='submit'
                    >
                    Enviar
                </Button>
        </FormControl>
    </Box>
  )
}

export default ReviewCharge