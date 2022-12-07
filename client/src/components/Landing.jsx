import React from "react";
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import { Heading, Stack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

export default function Landing() {
	return (
		<div>
			<Stack>
				<Heading>Landing</Heading>
				<Image
					w={"60"}
					src={
						"https://yerbasara.files.wordpress.com/2017/04/mate3.jpg?w=602&h=333"
					}
				/>
				<Button size={"lg"} w={"10%"}>
					<Link to={"/home"}>Vamos a Matear</Link>
				</Button>
			</Stack>
		</div>
	);
}
