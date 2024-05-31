import { Request, Response } from "express";
import prisma from "../prisma/prisma-client.js";

/**
 * @route POST /api/type/create
 * @desc Создание типа
 * @access Private
 */
const create = async (req: Request, res: Response) => {
  try {
    const { name }: {name: string} = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Все поля обязательные",
      });
    }

    const type = await prisma.type.create({
      data: {
        name,
      },
    });

    return res.status(201).json(type);
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так",
    });
  }
};

/**
 * @route GET /api/type
 * @desc Получение всех типов
 * @access Public
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const types = await prisma.type.findMany();

    res.status(200).json(types)
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить типы товаров",
    });
  }
};

export { create, getAll };
