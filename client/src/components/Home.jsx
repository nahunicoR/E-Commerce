import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, GridItem, Spinner, Flex, Heading } from "@chakra-ui/react";
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
	getReviews,
} from "../redux/actions";
import Filter from "./Filter";
import { AspectRatio } from "@chakra-ui/react";

export default function Home() {
	//redux
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products);
	//change
	const [loading, setLoading] = useState(true);
	//console.log(products);
	const [filters, setFilters] = useState({
		nameFilter: "",
		category: "",
		material: "",
	});

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
		setFilters({ ...filters, nameFilter: e.target.value });
		setCurrentPage(1);
	};
	const handleFilterByCategory = (e) => {
		console.log(e.target.value);
		dispatch(filterByCategory(e.target.value));
		setFilters({ ...filters, category: e.target.value });
		setCurrentPage(1);
	};
	const handleSortbyPrice = (e) => {
		dispatch(orderByPrices(e.target.value));
		setFilters({ ...filters, nameFilter: e.target.value });
		setCurrentPage(1);
	};
	const handleFilterByMaterial = (e) => {
		console.log(e.target.value);
		dispatch(filterByMaterials(e.target.value));
		setFilters({ ...filters, material: e.target.value });
		setCurrentPage(1);
	};
	const handleCleanFilter = () => {
		dispatch(filterByMaterials("all"));
		dispatch(filterByCategory("all"));
		dispatch(orderByNames("A-Z"));
		setFilters({ nameFilter: "", category: "", material: "" });
	};
	//info de nuestra db https://e-commerce-production-d476.up.railway.app/products
	useEffect(() => {
		dispatch(getProducts());
		dispatch(getReviews(0));
		setTimeout(() => {
			setLoading(false);
		}, 800);
	}, [dispatch]);
	//". map map ."
	return (
		<>
			<Grid
				h={"1000px"}
				gridTemplateRows="repeat(4,1fr)"
				gridTemplateColumns="repeat(4,1fr)"
				gridTemplateAreas={
					'"filter card card card" "filter card card card" " filter card card card" ". pag pag pag" '
				}
				rowGap={"10"}
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
					filters={filters}
					handleCleanFilter={handleCleanFilter}
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
					<GridItem gridArea={"card"}>
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
				{!loading ? (
					<Flex
						position={"absolute"}
						top={"1000"}
						gap={5}
						flexDirection={"column"}
						justifyContent={"center"}
					>
						<Heading size={"lg"}>Ubicanos</Heading>

						<AspectRatio w={"325%"} ratio={1 / 1}>
							<iframe
								title="map-stores"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng"
							/>
						</AspectRatio>
					</Flex>
				) : null}
			</Grid>
		</>
	);
}
