import {
	Box,
	GridItem,
	HStack,
	Input,
	IconButton,
	Text,
	Radio,
	Stack,
	RadioGroup,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import React from "react";

function Filter({
	handleFilterByCategory,
	handleSortbyName,
	handleSortbyPrice,
	handleFilterByMaterial,
	handleInputChange,
	handleSearch,
	input,
}) {
	return (
		<>
			<GridItem rowSpan={3} colSpan={1}>
				<Box borderWidth="1px" borderRadius="lg" p={4}>
					<Box paddingBottom={4}>
						<HStack paddingBottom={5}>
							<Input value={input} onChange={handleInputChange} size={"md"} />
							<IconButton
								onClick={handleSearch}
								colorScheme={"teal"}
								aria-label="Search database"
								icon={<BiSearch />}
							/>
						</HStack>
						<Text textAlign={"center"} fontWeight="semibold">
							Ordenar
						</Text>
						<RadioGroup /* defaultValue={"A-Z"} */ colorScheme="teal">
							<Stack spacing={[1, 5]} direction={["column"]}>
								<Radio onChange={handleSortbyName} value="A-Z">
									A-Z
								</Radio>
								<Radio onChange={handleSortbyName} value="Z-A">
									A-Z
								</Radio>
								<Radio onChange={handleSortbyPrice} value="-price">
									Menor precio
								</Radio>
								<Radio onChange={handleSortbyPrice} value="+price">
									Mayor precio
								</Radio>
							</Stack>
						</RadioGroup>
					</Box>

					<Text textAlign={"center"} fontWeight="semibold">
						{"Categoria"}
					</Text>
					<Stack spacing={[1, 5]} direction={["column"]}>
						<RadioGroup
							colSpan="auto"
							colorScheme="teal"
							/* defaultValue={"all"} */
						>
							<Stack spacing={[1, 5]} direction={"column"}>
								<Radio onChange={handleFilterByCategory} value="all">
									Todos
								</Radio>
								<Radio onChange={handleFilterByCategory} value="mate">
									Mate
								</Radio>
								<Radio onChange={handleFilterByCategory} value="yerba">
									Yerba
								</Radio>
								<Radio onChange={handleFilterByCategory} value="bombilla">
									Bombilla
								</Radio>
								<Radio onChange={handleFilterByCategory} value="kit">
									Kit
								</Radio>
							</Stack>
						</RadioGroup>
					</Stack>
					<Text textAlign={"center"} fontWeight="semibold">
						{"Material"}
					</Text>
					<Stack spacing={[1, 5]} direction={["column"]}>
						<RadioGroup
							colSpan="auto"
							colorScheme="teal"
							/* defaultValue={"all"} */
						>
							<Stack spacing={[1, 5]} direction={"column"}>
								<Radio onChange={handleFilterByMaterial} value="all">
									Todos
								</Radio>
								<Radio onChange={handleFilterByMaterial} value="Industrial">
									Industrial
								</Radio>
								<Radio onChange={handleFilterByMaterial} value="Artesanal">
									Artesanal
								</Radio>
								<Radio onChange={handleFilterByMaterial} value="Sintetico">
									Sintetico
								</Radio>
							</Stack>
						</RadioGroup>
					</Stack>
				</Box>
			</GridItem>
		</>
	);
}

export default Filter;
