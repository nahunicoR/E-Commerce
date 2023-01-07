import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Text } from "@chakra-ui/react";

export default function Rating({ productId, size, reviewRating, optionChoose }) {

  const rating = useSelector(state => state.products.reviews)
  const [ quantity, setQuantity ] = useState(0)
  
  let startsblank = ["✰","✰","✰","✰","✰"];
  let starChoose = [
    <Button p={0} verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size} onClick={() => setQuantity(1)}>✰</Button>,
    <Button verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size} onClick={() => setQuantity(2)}>✰</Button>,
    <Button verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size} onClick={() => setQuantity(3)}>✰</Button>,
    <Button verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size} onClick={() => setQuantity(4)}>✰</Button>,
    <Button verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size} onClick={() => setQuantity(5)}>✰</Button>
  ] 
  
  let total = 0;
  const findIdProduct = rating.filter(r => r.productId === productId ? r.productId : null)
  findIdProduct && findIdProduct.map(r => total = total + r.rating)
  /*rating.map(r => total = total + r.rating)*/ //comentar esta linea si 10 y 11 estan activas
  let sumTotal = Math.round(total / findIdProduct.length) //usar findIdProduct.length si 10 y 11 estan activas sino rating
  // console.log(restQuantity, quantity +quantity)
  return (
    <div>
      { !quantity 
          ? <Text fontSize={size} color="teal" >
              {Array.from(!optionChoose ? startsblank :starChoose).fill("★", 0, reviewRating ? reviewRating : sumTotal)}
            </Text>

          : <Text fontSize={size} color="teal" >
              {[
                  Array(5).fill( 0, 0, quantity ).map( (r,i) => <Button key={i} verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size}
                    onClick={ () =>  setQuantity( i + 1 )}>★</Button>),

                  ...Array(5).fill( 0, 0, 5 - quantity ).map( (_,i) => <Button key={i} verticalAlign={0} variant={"unstyled"} fontWeight={"thin"} fontSize={size}
                    onClick={ () =>  setQuantity( quantity + i + 1 )}>✰</Button>)]}
            </Text>
      }
    </div>
  )
}