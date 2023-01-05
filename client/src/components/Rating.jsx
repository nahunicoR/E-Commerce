import { Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Rating({ productId, size, reviewRating }) {

  const rating = useSelector(state => state.products.reviews)

  let startsblank = [<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>,<span>&#10032;</span>];
  let total = 0;
  const findIdProduct = rating.filter(r => r.productId === productId ? r.productId : null)
  findIdProduct && findIdProduct.map(r => total = total + r.rating)
  /*rating.map(r => total = total + r.rating)*/ //comentar esta linea si 10 y 11 estan activas
  let sumTotal = Math.round(total / findIdProduct.length) //usar findIdProduct.length si 10 y 11 estan activas sino rating
  
  return (
    <div>
      <Text fontSize={size} color="teal" >
        {Array.from(startsblank).fill(<span>&#9733;</span>, 0, reviewRating ? reviewRating : sumTotal)}
      </Text>
    </div>
  )
}