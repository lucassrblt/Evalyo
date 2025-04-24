import fs from "fs";
import pdfParse from "pdf-parse";

async function extractTextFromPDF(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File does not exist");
    }
    const dataBuffer = fs.readFileSync(filePath);
    console.log("dataBuffer", dataBuffer);
    return await pdfParse(dataBuffer);
  } catch (error) {
    console.error("Error reading PDF file:", error);
  }
}

const removeFile = (filePath: string) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully");
    }
  });
};

export { extractTextFromPDF, removeFile };
