import { Alert, CloseButton } from "@chakra-ui/react"

export const SuccessMessage = ({ title, onClose }) => {
  return (
    <Alert.Root zIndex={999} status="success" alignItems="center" maxW="650px" position="fixed" right={4} bottom={4}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
      </Alert.Content>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        onClick={onClose}
        colorPalette="green"
        variant="solid"
        minWidth="25px"
        height="25px"
      />
    </Alert.Root>
  )
}