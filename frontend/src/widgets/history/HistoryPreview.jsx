import {
  Box,
  Image,
  Text
} from "@chakra-ui/react";

export const HistoryPreview = ({ previewTitle, image }) => {
  return (
    <Box flex={1}>
      <Text fontSize="sm" mb={1}>{previewTitle}</Text>
      <Image 
        src={image}
        maxH="150px"
        w="100%"
        objectFit="cover"
        objectPosition="center"
        borderRadius="md"
      />
    </Box>
  )
}