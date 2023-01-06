import React from "react";
import { Button } from "@chakra-ui/button";
import { Link, renderMatches } from "react-router-dom";
import { Stack, Box } from "@chakra-ui/layout";
import "react-multi-carousel/lib/styles.css";
import videomate from '../assets/to-mate.mp4'

export default function Landing() {

	return (
		<div>
			<Stack position={"relative"} height={"86vh"}>
               <Box
                  as='video'
				  controls
                  src={videomate}
	              autoplay loop muted 
                  alt='video to-mate'
                  objectFit='contain'
                  sx={{
                   aspectRatio: '16/9'
                  }}
                />		
			 	 <Button
					colorScheme={"teal"}
					position={"absolute"}
					top="55%"
					left={"44%"}
					size={"lg"}
					w={"15%"}
				>
					<Link to={"/home"}>Vamos a Matear</Link>
			 	</Button>
			  </Stack> 
		</div>
	
	);
			
}

