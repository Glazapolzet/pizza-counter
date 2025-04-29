import { Box, Image, Text } from "@chakra-ui/react"

export const ImagePreview = ({previewTitle, image}) => {
  return (
    <Box w="100%">
      <Text fontSize="xl" fontWeight="bold" color="gray.900" mb={2}>{previewTitle}</Text>
      <Image 
        src={image}
        h="400px"
        w="100%"
        objectFit="cover"
        borderRadius="md" 
        mx="auto"
      />
    </Box>
  )
}