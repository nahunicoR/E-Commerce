import {
	Box,
	GridItem,
	HStack,
	Input,
	IconButton,
	Text,
	Checkbox,
	Stack,
	CheckboxGroup,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import React from "react";

function Filter({
	handleFilterByCategory,
	handleSortbyName,
	handleSortbyPrice,
	handleFilterByMaterial,
}) {
	return (
		<>
			<GridItem rowSpan={3} colSpan={1}>
				<Box borderWidth="1px" borderRadius="lg" p={4}>
					<Box paddingBottom={4}>
						<HStack paddingBottom={5}>
							<Input size={"md"} />
							<IconButton
								colorScheme={"teal"}
								aria-label="Search database"
								icon={<BiSearch />}
							/>
						</HStack>
						<Text textAlign={"center"} fontWeight="semibold">
							Ordenar
						</Text>
						<CheckboxGroup /* defaultValue={"A-Z"} */ colorScheme="teal">
							<Stack spacing={[1, 5]} direction={["column"]}>
								<Checkbox onChange={handleSortbyName} value="A-Z">
									A-Z
								</Checkbox>
								<Checkbox onChange={handleSortbyName} value="Z-A">
									A-Z
								</Checkbox>
								<Checkbox onChange={handleSortbyPrice} value="-precio">
									Menor precio
								</Checkbox>
								<Checkbox onChange={handleSortbyPrice} value="+precio">
									Mayor precio
								</Checkbox>
							</Stack>
						</CheckboxGroup>
					</Box>

					<Text textAlign={"center"} fontWeight="semibold">
						{"Categoria"}
					</Text>
					<Stack spacing={[1, 5]} direction={["column"]}>
						<CheckboxGroup
							colSpan="auto"
							colorScheme="teal"
							/* defaultValue={"all"} */
						>
							<Stack spacing={[1, 5]} direction={"column"}>
								<Checkbox onChange={handleFilterByCategory} value="all">
									Todos
								</Checkbox>
								<Checkbox onChange={handleFilterByCategory} value="mate">
									Mate
								</Checkbox>
								<Checkbox onChange={handleFilterByCategory} value="yerba">
									Yerba
								</Checkbox>
								<Checkbox onChange={handleFilterByCategory} value="bombilla">
									Bombilla
								</Checkbox>
								<Checkbox onChange={handleFilterByCategory} value="kit">
									Kit
								</Checkbox>
							</Stack>
						</CheckboxGroup>
					</Stack>
					<Text textAlign={"center"} fontWeight="semibold">
						{"Material"}
					</Text>
					<Stack spacing={[1, 5]} direction={["column"]}>
						<CheckboxGroup
							colSpan="auto"
							colorScheme="teal"
							/* defaultValue={"all"} */
						>
							<Stack spacing={[1, 5]} direction={"column"}>
								<Checkbox onChange={handleFilterByMaterial} value="all">
									Todos
								</Checkbox>
								<Checkbox onChange={handleFilterByMaterial} value="Industrial">
									Industrial
								</Checkbox>
								<Checkbox onChange={handleFilterByMaterial} value="Artesanal">
									Artesanal
								</Checkbox>
								<Checkbox onChange={handleFilterByMaterial} value="Sintetico">
									Sintetico
								</Checkbox>
							</Stack>
						</CheckboxGroup>
					</Stack>
				</Box>
			</GridItem>
		</>
	);
}

export default Filter;
