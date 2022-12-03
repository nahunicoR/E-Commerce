import React from "react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Heading, Stack } from "@chakra-ui/layout";

export default function Landing() {
	return (
		<div>
			<Stack>
				<Heading>Landing</Heading>

				<Button w={"10%"}>
					<Link to={"/home"}>Vamos a Matear</Link>
				</Button>
			</Stack>
		</div>
	);
}
