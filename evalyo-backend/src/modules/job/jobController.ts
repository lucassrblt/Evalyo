import { Request, Response } from "express";
import {
  extractTextFromPDF,
  removeFile,
} from "../../utils/files/filesServices";
import sendPrompt from "../prompt/promptService";

const createJob = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const uploadJobDescription = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    if (!req.file.path) {
      return res
        .status(400)
        .json({ success: false, message: "File path is missing" });
    }

    const data = await extractTextFromPDF(req.file.path);
    console.log("data after extract", data);

    if (!data || !data.text) {
      return res
        .status(400)
        .json({ success: false, message: "No text found in PDF" });
    }

    // Send chtgpt prompt
    const context = `
    You are a job description analyzer. Analyze the following job description and extract the following information. 
    Return the result as a JSON object with the following fields:
    
    - jobTitle: string | null
    - jobDescription: string | null
    - contractType: string | null
    - startDate: string | null
    - location: string | null
    - keyPoints: string[] | null
    - languages: string[] | null
    
    If any of the information is missing or not clearly stated, return null for that field.
    
    Job Description:
    ${data.text}
    `;
    const result = await sendPrompt(context);
    removeFile(req.file.path);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Error processing file:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const compareJob = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createJob, uploadJobDescription };
