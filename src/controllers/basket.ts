import { Response } from "express";
import prisma from "../prisma/prisma-client.js";
import { CustomRequest } from "../middlewares/auth.js";
import {
  BasketRequestBodyWithUser,
  BasketWhitCountRequestBodyWithUser,
  basketRequestParamsWithUser,
} from "./types/types.js";

/**
 * @route GET /api/basket
 * @desc Получение всех товаров в корзине
 * @access Private
 */
const getAll = async (req: CustomRequest, res: Response) => {
  try {
    const basketDevices = await prisma.basketDevice.findMany({
      where: {
        basketId: req.user?.basket,
      },
    });

    res.status(200).json(basketDevices);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить товары",
    });
  }
};

/**
 * @route POST /api/basket/add
 * @desc Добавление товара в корзину
 * @access Private
 */
const add = async (req: BasketRequestBodyWithUser, res: Response) => {
  try {
    const id = req.body.id;

    const basketDevice = await prisma.basketDevice.findMany({
      where: {
        deviceId: id,
        basketId: req.user?.id,
      },
    });

    if (!(basketDevice.length === 0)) {
      res.status(200).json({ message: "Товар уже в корзине" });
    } else {
      const newBasketDevice = await prisma.basketDevice.create({
        data: {
          deviceId: id,
          basketId: req.user?.id,
        },
      });
      res.status(200).json(newBasketDevice);
    }
  } catch (error) {
    res.status(500).json({
      message: "Не удалось добавить в корзину " + error,
    });
  }
};

/**
 * @route PATCH /api/basket/count
 * @desc Изменение кол-ва в товара в корзине
 * @access Private
 */
const changeCount = async (
  req: BasketWhitCountRequestBodyWithUser,
  res: Response
) => {
  try {
    const { id, count } = req.body;

    if (count < 0) {
      return res
        .status(400)
        .json({ message: "Количество должно быть положительным" });
    }

    const basketDevice = await prisma.basketDevice.update({
      where: {
        id,
      },
      data: {
        count,
      },
    });

    if (basketDevice) {
      res.status(200).json(basketDevice);
    } else {
      res.status(500).json({ message: "Не удалось найти товар" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Не удалось добавить в корзину",
    });
  }
};

/**
 * @route DELETE /api/basket/remove/:id
 * @desc Удаление товара из корзины
 * @access Private
 */
const remove = async (req: basketRequestParamsWithUser, res: Response) => {
  try {
    const { id } = req.params;

    const basketDevice = await prisma.basketDevice.delete({
      where: {
        id: +id,
      },
    });

    if (basketDevice) {
      res.status(200).json({ success: "Товар удален из корзины" });
    } else {
      res.status(404).json({
        message: "Товар не найден",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить товар из корзины",
    });
  }
};

export { getAll, add, remove, changeCount };
