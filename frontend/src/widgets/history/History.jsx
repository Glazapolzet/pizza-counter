import {
  Box,
  Button,
  HStack,
  IconButton,
  SimpleGrid,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import deleteIcon from "../../assets/icons/delete-icon.svg";
import { ErrorMessage, SuccessMessage } from "../../components";
import { createReport } from "../../utils";
import { HistoryPreview } from "./HistoryPreview";

export const History = ({ history, onRemove }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const generateReport = (item) => {
    setSuccess(null);
    setError(null);

    try {
      createReport(item);

      setSuccess({
        title: "Отчет успешно сформирован!",
      });
      setTimeout(() => setSuccess(null), 10000);
    }
    catch (error) {
      setError({
        title: "Ошибка при создании отчета",
        description: error.message,
      });
      console.error("PDF generation error:", error);
    }
  }

  return (
    <>
      {success && <SuccessMessage title={success.title} onClose={() => setSuccess(null)} />}

      {error && (
        <ErrorMessage
          title={error.title}
          description={error.description}
          onClose={() => setError(null)}
        />
      )}

      <SimpleGrid columns={1} rowGap={15}>
        {history.map((item, index) => (
          <Box key={index} borderWidth="1px" borderRadius="lg" p={3}>
            <HStack justifyContent="space-between" mb={2}>
              <Text fontWeight="bold">{item.date}</Text>
              <HStack>
                <Button 
                  size="sm" 
                  colorPalette="orange"
                  onClick={() => generateReport(item)}
                >
                  Сформировать отчет
                </Button>
                <IconButton
                  colorPalette="red"
                  size="sm"
                  onClick={() => onRemove(index)}
                  aria-label="Удалить из истории"
                  variant="solid"
                >
                  <img src={deleteIcon} alt="Delete" width="16px" height="16px" />
                </IconButton>
              </HStack>
            </HStack>
            <Text mb={2}>Найдено пицц: <Text as="span" fontWeight="bold" color="green.500">{item.count}</Text></Text>
            <HStack spacing={2}>
              <HistoryPreview previewTitle={"Оригинал:"} image={item.original} />
              <HistoryPreview previewTitle={"Результат:"} image={item.result} />
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}