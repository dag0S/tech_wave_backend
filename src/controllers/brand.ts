import { Request, Response } from "express";
import prisma from "../prisma/prisma-client.js";

/**
 * @route POST /api/brand/create
 * @desc Создание бренда
 * @access Private
 */
const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Все поля обязательные",
      });
    }

    const brand = await prisma.brand.create({
      data: {
        name,
      },
    });

    return res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так",
    });
  }
};

/**
 * @route GET /api/brand
 * @desc Получение всех брендов
 * @access Public
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const brands = await prisma.brand.findMany();

    res.status(200).json(brands)
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить бренды",
    });
  }
};



export { create, getAll };
