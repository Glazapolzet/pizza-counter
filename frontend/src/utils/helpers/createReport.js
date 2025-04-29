import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ROBOTO_FONT_BASE64 } from "../constants/roboto_font_base64";

const registerRussianFont = (doc) => {
  doc.addFileToVFS("Roboto-Regular.ttf", ROBOTO_FONT_BASE64);
  doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
  doc.setFont("Roboto");
};

export const createReport = async (item) => {
  try {
    const doc = new jsPDF();
    registerRussianFont(doc);

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const imgWidth = pageWidth - 2 * margin;
    const imgHeight = 100;

    doc.setFontSize(18);
    doc.text("Отчет о найденных пиццах", pageWidth / 2, 20, {
      align: "center",
    });

    doc.setFontSize(12);
    doc.text(`Дата анализа: ${item.date}`, margin, 35);
    doc.text(`Найдено пицц: ${item.count}`, margin, 45);

    let yPosition = 60;

    const addImageToPDF = async (imgSrc, title) => {
      doc.text(title, margin, yPosition - 5);

      const img = new Image();
      img.src = imgSrc;

      await new Promise((resolve) => {
        img.onload = () => {
          const ratio = img.width / img.height;
          const height = imgHeight;
          const width = height * ratio;

          const x = margin + (imgWidth - width) / 2;
          doc.addImage(img, "JPEG", x, yPosition, width, height);
          resolve();
        };
        img.onerror = () => {
          throw new Error("Не удалось загрузить изображение");
        };
      });

      yPosition += imgHeight + 25;
    };

    await addImageToPDF(item.original, "1. Исходное изображение");
    await addImageToPDF(item.result, "2. Результат с выделенными пиццами");

    doc.save(`Отчет_о_пиццах_${item.date.replace(/[/:]/g, "-")}.pdf`);

    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};
