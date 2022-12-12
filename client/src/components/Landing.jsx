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

			    <Button 
				// position={'absolute'}
				top="50%"
				left={"50%"}
				size={"lg"}
				 w={"10%"}>
					<Link to={"/home"}>Vamos a Matear</Link>
				</Button>		
				
				<Carousel responsive={responsive}>
	
		          <Image  boxSize='750px' objectFit='cover' 
		               src= {"https://yerbasara.files.wordpress.com/2017/04/mate3.jpg"} />
		          <Image  boxSize='750px' objectFit='cover'
		               src= {"https://yerbasara.files.wordpress.com/2017/06/a59cd1f930d61534cacb05b3f9d19104cd2b19365e17063e72pimgpsh_fullsize_distr.png?w=661&h=334"}  />
		          <Image  boxSize='750px' objectFit='cover'
		               src= {"https://s3.amazonaws.com/static.om.anigamy.net/static.biennatural.com.ar/App/Article/el-mate-una-infusion-exclusiva-de-los-argentinos-6272-mainImage-0.jpg"}  />
		          <Image  boxSize='750px' objectFit='cover'
		                src= {"https://statics.forbesargentina.com/2021/06/crop/60d1e2c96474f__822x460.webp"} />
	
	
                </Carousel>
            </Stack>
		</div>
	);
}

export default Landing









// 
// 	
// 
