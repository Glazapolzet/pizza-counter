import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorMessage, ImagePreview, ImageUpload } from "./components";
import { blobToBase64 } from "./utils";
import { History } from "./widgets";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localHistory = JSON.parse(localStorage.getItem("history")) || [];
    if (localHistory.length === 0) return;

    setHistory(localHistory);
  }, [])

  useEffect(() => {
    if (history.length === 0) return;

    localStorage.setItem("history", JSON.stringify(history));
  }, [history])

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  };

  const detectPizzas = async (image) => {
    if (!image) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      const blob = await fetch(image).then((res) => res.blob());
      formData.append("image", blob);

      const response = await axios.post("http://localhost:5000/detect", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const base64 = await blobToBase64(image)

      setResult(response.data);
      setHistory(prev => [
        {
          original: base64,
          result: `data:image/jpeg;base64,${response.data.image}`,
          count: response.data.count,
          date: new Date().toLocaleString(),
        },
        ...prev.slice(0, 9),
      ]);
    } 
    catch (error) {
      setError({
        title: "Ошибка!",
        description: "Не удалось обработать изображение. Попробуйте ещё раз."
      });

      console.error(error);
    } 
    finally {
      setIsLoading(false);
    }
  };

  const removeFromHistory = (index) => {
    setHistory(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {error && <ErrorMessage title={error.title} description={error.description} onClose={() => setError(null)} />}

      <Center minW="100vw" minH="100vh" p={10} alignItems="center">
        <HStack width="90%" alignItems="stretch" justifyContent="space-between">
          <VStack flex={1} rowGap={4} maxW="50%">
            <Heading textAlign="center">
              🍕 Счётчик пицц в кафе
            </Heading>

            <VStack bg="white" p={4} borderRadius="lg" boxShadow="md" w="100%">
              <ImageUpload title={"Загрузить изображение"} onUpload={handleImageUpload} />

              {image && (
                <ImagePreview previewTitle={"Загруженное изображение:"} image={image} />
              )}

              {image && (
                <Button
                  onClick={() => detectPizzas(image)}
                  w="100%"
                  colorPalette="gray"
                  variant="solid"
                  aria-label="Найти пиццы"
                >
                  {isLoading ? "Обработка..." : "Найти пиццы"}
                </Button>
              )}
            </VStack>

            {result && (
              <VStack bg="white" p={6} borderRadius="lg" boxShadow="md" w="100%">
                <ImagePreview 
                  previewTitle={<>Найдено пицц: <Text as="span" color="green.500">{result.count}</Text></>} 
                  image={`data:image/jpeg;base64,${result.image}`} 
                />
              </VStack>
            )}
          </VStack>

          <Box flex={1} maxW="45%" borderRadius="lg" boxShadow="md">
            <Heading size="lg" mb={4}>
              История проверок
            </Heading>
            {history.length === 0 ? (
              <Text color="gray.500">
                Здесь будут появляться предыдущие проверки
              </Text>
            ) : (
              <History history={history} onRemove={removeFromHistory} />
            )}
          </Box>
        </HStack>
      </Center>
    </>
  );
}

export default App;