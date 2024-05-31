import { Request, Response } from "express";

/**
 * @route POST /api/device/create
 * @desc Добавление товара
 * @access Private
 */
const create = async (req: Request, res: Response) => {
  res.send("create");
};

/**
 * @route GET /api/device/
 * @desc Получение всех товаров
 * @access Public
 */
const getAll = async (req: Request, res: Response) => {
  res.send("getAll");
};

/**
 * @route GET /api/device/:id
 * @desc Получение одного товара
 * @access Public
 */
const getOne = async (req: Request, res: Response) => {
  res.send("get one");
};

export { create, getAll, getOne };
