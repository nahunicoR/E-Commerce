import React from 'react'
import { useSelector } from "react-redux"
import { Text, Stack, Box } from "@chakra-ui/react"
import Rating from './Rating';
import ReviewCharge from './ReviewCharge';

function Review({productId}) {
  const reviews = useSelector(state => state.products.reviews)
  return (
    <div>
       {reviews &&
         reviews.map((rev, i) => {
           return (
            <div key={i}>
              <Stack margin={"2rem"}  >
                <Box>
                  <Rating reviewRating={rev.rating} size={"1.6rem"} />
                </Box>
                <Text>{rev.description}</Text>
              </Stack>
            </div>          
          );
        })}
        <ReviewCharge productId={productId}/>
    </div>
  );
}

export default Review