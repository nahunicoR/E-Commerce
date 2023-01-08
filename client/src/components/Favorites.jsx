import { useSelector, useDispatch } from "react-redux"
// import { MdOutlineFavoriteBorder } from "react-icons/md"
import { Button, Box, Image, Text, Stack} from '@chakra-ui/react'
import { useEffect } from "react"
import { deleteFavorites } from "../redux/actions"

export default function Favorites() {
  const getFavorites = useSelector(state => state.products.favorites)
  const dispatch = useDispatch()
  useEffect( ()=>{
  localStorage.setItem("favorites", JSON.stringify(getFavorites));
})

return(
  <>
    {
      getFavorites && getFavorites.map((f, i) => {
        return(
          <Stack alignItems={"center"}>
            <Button variant={"unstyled"} onClick={()=> dispatch(deleteFavorites(f))}>x</Button>
            <Box>
              <Image 
                rounded="lg"
                width="140px"
                height="120px"
                fit="contain"
                src={f.image}
                alt={f.title}
                draggable="false"
                loading="lazy"
              />
              <Text>
                {f.title}
              </Text>
            </Box>
          </Stack>
            )
          })
        }
    </>
)
}
















// export default function Favorites() {
  // const getFavorites = useSelector(state => state.products.favorites)
  // console.log(getFavorites)
  // return (
  //   <div>
  //     {
  //       getFavorites && getFavorites.map(f => {
  //         return(
  //           <Text>
  //             {f.title}
  //            </Text>
  //         )
  //       })
  //     }
  //   </div>
  // )
// }