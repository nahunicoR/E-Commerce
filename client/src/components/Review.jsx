import React from 'react'
import { useSelector } from "react-redux"
import { Text, Stack } from "@chakra-ui/react"
function Review() {
  const reviews = useSelector(state => state.products.reviews)
  return (
    <div>
       {reviews &&
         reviews.map((rev, i) => {
           let rating = [<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>];
           return (
<div key={i}>
              <Stack margin={"2rem"}  >
               <Text fontSize={"1.5rem"} color="teal" >
                {rating.fill(<span>&#9733;</span>, 0, rev.rating)}
              </Text>
               <Text>{rev.description}</Text>
            </Stack>
</div>
          );
        })}
    </div>
  );
}

export default Review