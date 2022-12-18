import { formatPrice } from "./Cart"
import { Box, Stack, Text, Image } from "@chakra-ui/react"

export default function CartItem(props) {
  
  const {title, image, price } = props
  return (
    <div>
      <Stack direction="row" spacing="5" width="full" border="1px solid #eee" shadow={"md"} padding={"1rem"}>
      <Image
        rounded="lg"
        width="140px"
        height="120px"
        fit="contain"
        src={image}
        alt={title}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium" fontSize={"1.1rem"}>{title}</Text>
          <Text color={('gray.400', 'gray.800')} fontSize="2xl" paddingTop={"2rem"}>
            { formatPrice(price)}
          </Text>
        </Stack>
      </Box>
    </Stack>
    </div>
  )
}