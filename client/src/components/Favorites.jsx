import { useSelector, useDispatch } from "react-redux"
import { FaShoppingCart } from "react-icons/fa"
import { Button, Box, Image, Text, Stack, Container, useToast} from '@chakra-ui/react'
import { useEffect } from "react"
import { deleteFavorites, addProductsCart } from "../redux/actions"
import { formatPrice } from "./Cart"
import { Link } from "react-router-dom"

export default function Favorites(display) {
  const getFavorites = useSelector(state => state.products.favorites)
  const dispatch = useDispatch()
  const toast = useToast();
  useEffect( ()=>{
    localStorage.setItem("favorites", JSON.stringify(getFavorites));
  })

  return (
    <>
    <Box>
        <Link to={"/home"}>
          < Button
            colorScheme={"teal"}
            marginTop={"10"}
            marginLeft={"7"}
            position={"absolute"}
            right={"7"}
          >
            Volver
          </Button>
        </Link>
        <Container maxWidth={"50%"} background={"white"} >
          <Text fontSize={"1.5rem"} fontWeight={"bold"} textAlign={"center"} padding={"0.5rem"}>
            Bienvenido a Favoritos
          </Text>
          { getFavorites.length === 0 &&
            <Text fontSize={"1.5rem"} fontWeight={"bold"} textAlign={"center"} marginTop={"6.5rem"}>
              Articulos favoritos vacio 
            </Text>
          }
          
      {
        getFavorites && getFavorites.map((f, i) => {
          return(
              <Stack
                marginTop={"1.5rem"}
                position={"relative"}
                key={i}
                direction="row"
                spacing="5"
                width="full"
                border="1px solid #eee"
                shadow={"md"}
                padding={"2rem"}
                justifyContent={"space-between"}
                >
                <Image
                  rounded="lg"
                  width="140px"
                  height="120px"
                  fit="contain"
                  src={f.image}
                  alt={f.title}
                  draggable="false"
                  loading="lazy"
                />
                <Box pt="4">
                  <Stack spacing="0.5">
                    <Text fontWeight="medium" fontSize={"1.1rem"}>
                      {f.title}
                    </Text>
                    <Box
                      color={("gray.400", "gray.800")}
                      fontSize="2xl"
                      paddingTop={"2rem"}
                      display={"flex"}
                      >
                      {formatPrice(f.price)}
                    </Box>
                  </Stack>
                </Box>
                <Link to={`/detail/${f.id}`}>
							    <Button size={"md"} colorScheme={"teal"}>
								    Detalle
							    </Button>
						    </Link>
                <Button
                  position={"absolute"}
                  right={8}
                  bottom={4}
                  size={"md"}
                  colorScheme={"teal"}
                  marginLeft={"1.5"}
                  onClick={() => {
                    dispatch(addProductsCart(f));
                    dispatch((deleteFavorites(f)));
                        toast({
                    	status: "success",
                    	title: `${f.title} ha sido agregado a tu carrito!`,
                    	isClosable: true,
                    });
							    }}
						    >
							  <FaShoppingCart color="white" fontSize={"1.5rem"} />
						  </Button>
              < Button
                  colorScheme={"teal"}
                  marginTop={"10"}
                  marginLeft={"7"}
                  onClick={() => {
                    dispatch((deleteFavorites(f)));
                  }}
                >
                  Delete
                </Button>
              </Stack>
              )
            })
          }
          </Container>
        </Box>
    </>
  )
}