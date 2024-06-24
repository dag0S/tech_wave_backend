import { Response } from "express";
import prisma from "../prisma/prisma-client.js";
import { CustomRequest } from "../middlewares/auth.js";
import {
  FavoriteRequestBodyWithUser,
  FavoriteRequestParamsWithUser,
} from "./types/types.js";

/**
 * @route GET /api/favorites/
 * @desc Получение всех избранных товаров
 * @access Private
 */
const getAll = async (req: CustomRequest, res: Response) => {
  try {
    const favoriteDevices = await prisma.favoriteDevice.findMany({
      where: {
        favoritesListId: req.user?.favoritesList,
      },
    });

    res.status(200).json(favoriteDevices);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить избранные товары",
    });
  }
};

/**
 * @route POST /api/favorites/add
 * @desc Добавление товара в избранное
 * @access Private
 */
const add = async (req: FavoriteRequestBodyWithUser, res: Response) => {
  try {
    const id = req.body.id;

    const favoriteDevice = await prisma.favoriteDevice.create({
      data: {
        deviceId: id,
        favoritesListId: req.user?.id,
      },
    });

    res.status(200).json(favoriteDevice);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось добавить в избранное",
    });
  }
};

/**
 * @route DELETE /api/favorites/remove/:id
 * @desc Удаление товара из избранное
 * @access Private
 */
const remove = async (
  req: FavoriteRequestParamsWithUser,
  res: Response
) => {
  try {
    const { id } = req.params;

    const favoriteDevice = await prisma.favoriteDevice.delete({
      where: {
        id: +id,
      },
    });

    if (favoriteDevice) {
      res.status(200).json({ success: "Товар удален из избранного" });
    } else {
      res.status(404).json({
        message: "Товар не найден",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить товар из избранного",
    });
  }
};

export { getAll, add, remove };
