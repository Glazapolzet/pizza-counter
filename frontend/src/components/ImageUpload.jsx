import { Button, FileUpload } from "@chakra-ui/react";

export const ImageUpload = ({ title, onUpload }) => {
  return (
    <FileUpload.Root p={2} border="2px dashed" borderColor="gray.500" borderRadius="md" accept={["image/*"]}>
      <FileUpload.HiddenInput onChange={onUpload} />
      <FileUpload.Trigger asChild>
        <Button variant="solid" size="sm" colorPalette="orange">
          {title}
        </Button>
      </FileUpload.Trigger>
    </FileUpload.Root>
  )
}