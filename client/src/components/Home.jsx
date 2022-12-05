import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, Grid, GridItem, Spinner, Stack, CheckboxGroup, Box, Text } from "@chakra-ui/react";
import CardProduct from "./CardProduct";
import Pagination from "./Pagination";
import { getProducts } from "../redux/actions";


export default function Home() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);	

	console.log(products);
	
	const [ check, setCheck ] = useState({})
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 9;
	const indexLastProduct = currentPage * productsPerPage;
	const indexFirstProduct = indexLastProduct - productsPerPage;
	const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
	const pagination = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch, check]);
	const handlerCheck = (e) => {
		const { value, checked } = e.target
		if (value) {
			setCheck({value, checked})
		}
	}
//--------------------------------------------
const orderByCategory = (array, check) => {
	console.log("ch", check)
	if(check.checked) {
		let res = array.filter(f => f.category.toLowerCase() === check.value)
		console.log(res, "chee", check)
		return res.slice(indexFirstProduct, indexLastProduct);
	}else {
		const pagination = (page) => {
			setCurrentPage(page);
		};
		return array.slice(indexFirstProduct, indexLastProduct);
	}
}

	return (
    <>
      <Grid
        h={"1000px"}
        gridTemplateRows="repeat(3,1fr)"
        gridTemplateColumns="repeat(4,1fr)"
        gap={5}
        padding="10"
        paddingTop={"10"}
      >
        <GridItem borderRadius={"lg"} rowSpan={3} colSpan={1} bg="red.200">
          <Box p={4}>
						<Box paddingBottom={4}  >
							<Text textAlign={"center"} fontWeight="semibold">Filter{check.value}</Text>
							<CheckboxGroup colorScheme="green" defaultValue={"a-z"}>
								<Stack spacing={[1, 5]} direction={["column"]}>
									{/* <Checkbox onChange={ handlerCheck } value="a-z">a-z</Checkbox> */}
									<Checkbox onChange={ handlerCheck } value="z-a">z-a</Checkbox>
									<Checkbox onChange={ handlerCheck } value="precio">Precio</Checkbox>
								</Stack>
							</CheckboxGroup>
						</Box>
						
						<Text textAlign={"center"} fontWeight="semibold">Categorias</Text>
						<CheckboxGroup colorScheme="green">
							<Stack spacing={[1, 5]} direction={["column"]}>
								<CheckboxGroup colSpan="auto"
									colorScheme="green">
									<Stack spacing={[1, 5]} direction={"column"}>
										<Checkbox onChange={ handlerCheck } value="mate">Mate</Checkbox>
										<Checkbox onChange={ handlerCheck } value="yerba">Yerba</Checkbox>
										<Checkbox onChange={ handlerCheck } value="kit">Kit</Checkbox>
										<Checkbox onChange={ handlerCheck } value="bombilla">Bombilla</Checkbox>
									</Stack>
								</CheckboxGroup>
							</Stack>
						</CheckboxGroup>
					</Box>
        </GridItem>

        {currentProducts ? (
          orderByCategory(products, check).map((p) => {
            return (
              <div key={p.id}>
                <CardProduct
                  id={p.id}
                  img={p.image}
                  name={p.title}
                  price={p.price}
                  category={p.category}
                />
              </div>
            );
          })
        ) : (
          <Spinner color="teal" alignSelf={"center"} size={"lg"} />
        )}
        <Pagination
          pagination={pagination}
          productsPerPage={productsPerPage}
          allProducts={products.length}
        />
      </Grid>
    </>
  );
}
