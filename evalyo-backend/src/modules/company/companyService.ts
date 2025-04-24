import { Request, Response } from "express";
import prisma from "../../utils/prismaClient";
import { uploadFile } from "../storage/storageService";

const createCompany = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const logo = req.file;
    let attachment;
    // Validate request
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Name is required" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email is required" });
    }

    const emailExists = await prisma.company.findFirst({ where: { email } });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    if (logo) {
      attachment = await uploadFile(logo, "company");
    }

    const company = await prisma.company.create({
      data: {
        name,
        email,
        phone,
        logo:
          attachment && attachment.success
            ? attachment.data?.fileLocation
            : null,
      },
    });

    return res.status(201).json({ success: true, data: company });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to create company" });
  }
};

const getCompany = async (req: Request, res: Response) => {
  try {
    const companies = await prisma.company.findMany();

    return res.status(200).json({ success: true, data: companies });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to get company" });
  }
};

export { createCompany, getCompany };
