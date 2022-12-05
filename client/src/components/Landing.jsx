import React from 'react'
import images from '../export/export'
import './Landing.css';
import { motion } from 'framer-motion'
import { Button } from "@chakra-ui/button";
import { Link } from "react-router-dom";
import {  Stack } from "@chakra-ui/layout";

const Landing = () => {
  return (
	
				<div>
					<Stack>
								
						<Button w={"10%"}>
							<Link to={"/home"}>Vamos a Matear</Link>
						</Button>
					</Stack>
				
			
    <motion.div className='slider-container'>
        <motion.div className='slider' drag='x' 
        dragConstraints={{right: 0, left:-2123}} >
        {images.map(image => (
            <motion.div className='item'>
                <img src={image} alt="" />
            </motion.div>
        ))}
        </motion.div>
        
    </motion.div>
	</div>
  )
}

export default Landing









// 
// 	
// 
