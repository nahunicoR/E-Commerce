import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	/* Checkbox, */
	Grid,
	GridItem,
	Spinner,
	/* Stack,
	CheckboxGroup,
	Box,
	Text, */
	Flex,
	/* Input,
	HStack,
	IconButton, */
} from "@chakra-ui/react";
/* import { BiSearch } from "react-icons/bi"; */
import CardProduct from "./CardProduct";
import Pagination from "./Pagination";
import {
	getProducts,
	orderByNames,
	orderByPrices,
	filterByCategory,
	filterByMaterials,
	searchProduct,
} from "../redux/actions";
import Filter from "./Filter";

export default function Home() {
	//redux
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);
	//change
	const [loading, setLoading] = useState(true);
	//console.log(products);

	//Logica de paginaton
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 9;
	const indexLastProduct = currentPage * productsPerPage;
	const indexFirstProduct = indexLastProduct - productsPerPage;
	const currentProducts = products.slice(indexFirstProduct, indexLastProduct);
	const pagination = (page) => {
		setCurrentPage(page);
	};

	//logica de checkBoxes (antigua)
	/* const [check, setCheck] = useState({});

	const orderByCategory = (array, check) => {
		console.log(check);
		if (check.checked) {
			let res = array.filter((f) => f.category.toLowerCase() === check.value);
			console.log(res, check);
			return res.slice(indexFirstProduct, indexLastProduct);
		} else {
			return array.slice(indexFirstProduct, indexLastProduct);
		}
	};

	const handlerCheck = (e) => {
		const { value, checked } = e.target;
		if (value) {
			setCheck({ value, checked });
		}
	}; */

	//logica de searchBar
	const [input, setInput] = useState("");
	const handleInputChange = (e) => {
		setInput(e.target.value);
		handleSearch(e);
	};
	const handleSearch = (e) => {
		e.preventDefault();
		console.log(input);
		dispatch(searchProduct(input));
	};
	//logica de checkBoxes
	const handleSortbyName = (e) => {
		dispatch(orderByNames(e.target.value));
		setCurrentPage(1);
	};
	const handleFilterByCategory = (e) => {
		console.log(e.target.value);
		dispatch(filterByCategory(e.target.value));
		setCurrentPage(1);
	};
	const handleSortbyPrice = (e) => {
		dispatch(orderByPrices(e.target.value));
		setCurrentPage(1);
	};
	const handleFilterByMaterial = (e) => {
		console.log(e.target.value);
		dispatch(filterByMaterials(e.target.value));
		setCurrentPage(1);
	};
	//info de nuestra db https://e-commerce-production-d476.up.railway.app/products
	useEffect(() => {
		dispatch(getProducts());
		setTimeout(() => {
			setLoading(false);
		}, 800);
	}, [dispatch]);

	return (
		<>
			<Grid
				h={"1000px"}
				gridTemplateRows="repeat(4,1fr)"
				gridTemplateColumns="repeat(4,1fr)"
				gap={5}
				padding="10"
				paddingTop={"10"}
			>
				{/* <Text textAlign={"center"} fontWeight="semibold">
							Categoria:
							</Text>
							<CheckboxGroup colorScheme="teal">
							<Stack spacing={[1, 5]} direction={["column"]}>
							<CheckboxGroup colSpan="auto" colorScheme="teal">
							<Stack spacing={[1, 5]} direction={"column"}>
							<Checkbox onChange={handlerCheck} value="bombilla">
							Bombilla
							</Checkbox>
							<Checkbox onChange={handlerCheck} value="mate">
							Mate
							</Checkbox>
							<Checkbox onChange={handlerCheck} value="yerba">
							Yerba
							</Checkbox>
							<Checkbox onChange={handlerCheck} value="kit">
							Kit
							</Checkbox>
							</Stack>
							</CheckboxGroup>
							</Stack>

						</CheckboxGroup> */}

				{/*dejo el filtro de abajo ya que soluciona por ahora la paginación automaticamente*/}

				<Filter
					handleFilterByCategory={handleFilterByCategory}
					handleSortbyName={handleSortbyName}
					handleSortbyPrice={handleSortbyPrice}
					handleFilterByMaterial={handleFilterByMaterial}
					handleInputChange={handleInputChange}
					handleSearch={handleSearch}
					input={input}
				/>

				{!loading ? (
					currentProducts.map((p) => {
						return (
							<div key={p.id}>
								<CardProduct
									id={p.id}
									img={p.image}
									name={p.title}
									price={p.price}
									category={p.category}
									material={p.material}
									product={p}
								/>
							</div>
						);
					})
				) : (
					<GridItem colStart={2} colEnd={5} rowStart={1} rowEnd={4}>
						<Flex h={"1000px"} justifyContent={"center"} alignItems="center">
							<Spinner color="teal" alignSelf={"center"} size={"xl"} />
						</Flex>
					</GridItem>
				)}

				{!loading ? (
					<Pagination
						pagination={pagination}
						productsPerPage={productsPerPage}
						allProducts={products.length}
					/>
				) : null}
			</Grid>
		</>
	);
}
