import { Request, Response } from "express";
import prisma from "../prisma/prisma-client.js";
import { CategoryRequestBody, RequestBody } from "./types/types.js";

/**
 * @route POST /api/category/create
 * @desc Создание типа
 * @access Private
 */
const create = async (req: RequestBody<CategoryRequestBody>, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Все поля обязательные",
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так",
    });
  }
};

/**
 * @route GET /api/category
 * @desc Получение всех типов
 * @access Public
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();

    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить категории товаров",
    });
  }
};

export { create, getAll };
