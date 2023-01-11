import { useSelector } from "react-redux";
import { Text } from "@chakra-ui/react";

export default function Rating({ productId, size, reviewRating }) {

  const rating = useSelector(state => state.products.reviews)
  let total = 0;
  let startsblank = ["✰","✰","✰","✰","✰"];

  const findIdProduct = rating.filter(r => r.productId === productId ? r.productId : null) //por ID
  findIdProduct && findIdProduct.map(r => total = total + r.rating) // por ID
  // rating.map(r => total = total + r.rating) //comentar esta linea si por ID estan activas
  let sumTotal = Math.round(total / findIdProduct.length) //usar findIdProduct.length si por ID estan activas sino rating
  
  return (
    <div>
      { 
        <Text fontSize={size} color="teal" >
          {startsblank && startsblank.map((_, i) => reviewRating ? (reviewRating > i ? "★" : "✰") : (sumTotal > i ? "★" : "✰") )}
        </Text>
      }
    </div>
  )
}