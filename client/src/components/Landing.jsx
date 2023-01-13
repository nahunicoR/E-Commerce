import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/layout";
import "react-multi-carousel/lib/styles.css";
import videomate from "../assets/to-mate.mp4";

export default function Landing() {
	return (
		<div>
			{/* <Stack position={"relative"} height={"86vh"}> */}
			<Link to={"/home"}>
				<Box
					as="video"
					controls={false}
					src={videomate}
					autoPlay
					loop
					muted
					alt="video to-mate"
					objectFit="contain"
					sx={{
						aspectRatio: "16/9",
					}}
				/>
			</Link>

			{/* <Button
					colorScheme={"teal"}
					position={"absolute"}
					top="55%"
					left={"44%"}
					size={"lg"}
					w={"100%"}
				>
					
				</Button>  */}
			{/* </Stack> */}
		</div>
	);
}
