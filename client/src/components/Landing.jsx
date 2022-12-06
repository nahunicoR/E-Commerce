import React from 'react'
import style from './Landing.module.css';
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import {  Stack } from "@chakra-ui/layout";
import img1 from  "../assets/img1.jpg";

const Landing = () => {
  return (
	
		<div>
				<Stack>
								
						<Button w={"10%"}>
							<Link to={"/home"}>Vamos a Matear</Link>
						</Button>
                       <div className= {style.container}> <img src = {img1} alt= "imagen tomando mate"/></div>
				</Stack>
    
	     </div>
  )
}

export default Landing









// 
// 	
// 
