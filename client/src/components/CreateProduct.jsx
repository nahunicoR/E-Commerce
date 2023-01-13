import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useToast
} from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { useDispatch } from 'react-redux';
import { postProducts } from '../redux/actions';


function validate(form) {
    let errors = {}
    if (!form.title) {
      errors.title = 'Debes ingresar un nombre'
    } else if (form.name.length < 4) {
      errors.title = 'Debe tener al menos 4 caracteres'
    } else if (form.name.length > 30) {
      errors.title = 'Debe tener menos de 30 caracteres'
    }
     if (!form.price) {
      errors.price = "Este campo es Obligatorio"
    } else if (form.price < 0) {
      errors.price = 'El precio no puede ser negativo'
    }
     if (!form.category || !form.material) {
      errors.category = "Este campo es Obligatorio"
      errors.material = "Este campo es Obligatorio"
    }
    if (!form.description) {
		errors.description = "Este campo es Obligatorio";
	}
    if (!form.stock) {
		errors.stock = "Este campo es Obligatorio";
	}
    if (form.stock < 1) {
		errors.stock = "No se puede añadir un producto sin stock";
	}
    return errors
  }

export default function CreateProduct() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const [image, setImage] = useState("");
  const [button, setButton] = useState(true);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    material: "",
    description: "",
    image: "",
    stock: "",
  })
  const [errors, setErrors] = useState({
		title: "",
		price: "",
		category: "",
		material: "",
		description: "",
		image: "",
		stock: "",
  })

  useEffect(() => {
	if (
		form.title.length > 0 &&
		form.price.length > 0 &&
		form.category.length > 0 &&
		form.material.length > 0 &&
		form.description.length > 0 &&
		form.stock.length > 0
	) {
		setButton(false);
	} else {
		setButton(true);
	}
}, [form, setButton]);

function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value
      })
    )
  }
  function handleSelectCategory(e) {
    setForm({
        ...form,
        category: e.target.value,
    });
    };

    function handleSelectMaterial (e) {
        setForm({
            ...form,
            material: e.target.value,
        });
    };

  	const uploadImage = async (e) => {
	const files = e.target.files;
	const data = new FormData();
	data.append("file", files[0]);
	data.append("upload_preset", "ecomerce");
	// setLoading(true);
	const res = await fetch(
		"https://api.cloudinary.com/v1_1/m6nuel/image/upload",
		{
			method: "POST",
			body: data,
		}
	);
	const file = await res.json();
	setImage(file.secure_url);
};
  
  const handleSubmit = (e) => {
	//posteo a la db
    e.preventDefault();
      dispatch(postProducts(form));
	  console.log(form);
      setForm({
        title: "",
        price: "",
        category: "",
        material: "",
        description: "",
        image: "",
        stock: "",
      });
      alert("Se creó un nuevo producto!");

	  //feedback de creacion del producto y redirección a home.
	  toast({
		status:"success",
		title:`${form.title} ha sido agregado a la base de datos`,
		isClosable: true,
	  });
  };
  
  return (
      <>
        <Flex>
          <Flex
            marginTop='12vh'
            marginLeft='75px'
            width='100%'
            flexDir='column'
            alignItems='center'
            padding={{ base: '', lg: '0 5rem', xl: '0 15rem' }}>
            <Center
              width='80%'
              borderRadius='3xl'
              alignItems='flex-start'
              height='calc(100vh - 16vh)'
              margin='1vh 0'>
              <Flex
                flexDirection='column'
				justifyContent="center"
				marginLeft='1.5rem'
                gap='2.5rem'
                padding='5rem 0'
                width='70%'
				display= 'grid'
				backgroundColor={colorMode === 'dark' ? '#2C313D' : '#F8F8F8'}>
                <Heading>Crear Producto</Heading>
                <FormControl isRequired>
                  <FormLabel>Nombre del producto</FormLabel>
                  <Input
                    focusBorderColor='#98D035'
                    name='title'
                    value={form.title}
                    variant='flushed'
                    htmlSize={4}
                    size='md'
                    placeholder='Ingrese el nombre del producto'
                    onChange={(e) => handleChange(e)}
                    type='text'
                  />
                  {errors.title && (
                    <FormHelperText color='red.400'>{errors.title}</FormHelperText>
                  )}
                </FormControl>
                  <FormControl isRequired>
                  <FormLabel>Precio</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='gray.300'
                      fontSize='1.2em'
                      children='$'
                    />
                    <Input
                      focusBorderColor='#98D035'
                      name='price'
                      value={form.price}
                      variant='flushed'
                      htmlSize={4}
                      size='md'
                      onChange={(e) => handleChange(e)}
                      placeholder='Ingrese el precio del producto'
                      type='number'
                    />

                  </InputGroup>
                  {errors.price && (
                    <FormHelperText color='red.400'>
                      {errors.price}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Categoría</FormLabel>
                  <Select placeholder='Seleccionar categoría' name ="category" onChange={(e) => handleSelectCategory(e)} >
                    <option value='Bombilla'>Bombilla</option>
                    <option value='Kit'>Kit</option>
                    <option value='Mate'>Mate</option>
                    <option value='Yerba'>Yerba</option>
                    </Select>
                  {form.category && (
                    <FormHelperText width='70%' color='red.400'>
                      {errors.category}
                    </FormHelperText>
                  )}
                  </FormControl>
                  <FormControl isRequired>
                  <FormLabel>Material</FormLabel>
                  <Select placeholder='Seleccionar material' name="material" onChange={(e) => handleSelectMaterial(e)}>
                        <option value="Artesanal">Artesanal</option>
						<option value="Industrial">Industrial</option>
						<option value="Sintetico">Sintético</option>
                    </Select>
                  {form.material && (
                    <FormHelperText width='70%' color='red.400'>
                      {errors.material}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Descripción</FormLabel>
                  <Input
                    focusBorderColor='#98D035'
                    name='description'
                    value={form.description}
                    variant='flushed'
                    htmlSize={4}
                    size='md'
                    placeholder='Descripción del producto'
                    onChange={(e) => handleChange(e)}
                    type='text'
                  />
                  {errors.description && (
                    <FormHelperText color='red.400'>{errors.description}</FormHelperText>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Imagen</FormLabel>
                  <InputGroup>
				  <Input
                      hidden
					  type='text'
					  value={(form.image = image)}
                      name='image'
                      onChange={handleChange}
                      variant='flushed'
                      htmlSize={4}
                      size='md'
                    />
                    <Input
                      focusBorderColor='#98D035'
                      name='image'
                      variant='flushed'
                      htmlSize={4}
                      size='md'
                      onChange={uploadImage}
                      type='file'
                      placeholder='Imagen'
                    />
                    {image ? (
							<img
								alt="test"
								src={image}
								style={{ width: "190px", height: "auto" }}
							/>
						) : (
							<h4>Cargar imagen...</h4>
						)}
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    focusBorderColor='#98D035'
                    name='stock'
                    value={form.stock}
                    variant='flushed'
                    htmlSize={4}
                    size='md'
                    placeholder='Stock del producto'
                    onChange={(e) => handleChange(e)}
                    type='number'
                  />
                  {errors.stock && (
                    <FormHelperText color='red.400'>{errors.stock}</FormHelperText>
                  )}
                </FormControl>
                <HStack>
                  <Button
                    _hover={{
                      color: '#98D035',
                      transition: 'all .5s ease',
                      backgroundColor: '#E3FFB2'
                    }}
                    _active={{
                      color: '#98D035',
                      transition: 'all .5s ease',
                      backgroundColor: '#E3FFB2'
                    }}
					type='submit'
                    backgroundColor='teal'
                    onClick={(e) => handleSubmit(e)}
					disabled={button}>
                    Agregar
                  </Button>
                  <Link to='/home'>
                    <Button
                      marginLeft='1rem'
					  backgroundColor='teal'
                    >
                      Volver
                    </Button>
                  </Link>
                </HStack>
              </Flex>
            </Center>
          </Flex>
        </Flex>
      </>
    )
}