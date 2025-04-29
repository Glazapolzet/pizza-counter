import { Alert, CloseButton } from "@chakra-ui/react"

export const ErrorMessage = ({ title, description, onClose }) => {
  return (
    <Alert.Root zIndex={999} status="error" alignItems="center" maxW="650px" position="fixed" right={4} bottom={4}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>
          {description}
        </Alert.Description>
      </Alert.Content>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        onClick={onClose}
        variant="solid"
      />
    </Alert.Root>
  )
}
