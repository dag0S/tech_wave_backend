import { Response } from "express";
import prisma from "../prisma/prisma-client.js";
import { RatingRequestBodyWithUser } from "./types/types.js";

/**
 * @route POST /api/rating/estimate
 * @desc Оценка товара
 * @access Private
 */
const estimate = async (req: RatingRequestBodyWithUser, res: Response) => {
  try {
    const { rate, deviceId } = req.body;

    const rating = await prisma.rating.findMany({
      where: {
        userId: req.user?.id as number,
        deviceId,
      },
    });

    if (rating.length > 0) {
      return res.status(400).json({
        message: "Нельзя поставить больше одной оценки",
      });
    }

    await prisma.rating.create({
      data: {
        rate,
        userId: req.user?.id,
        deviceId,
      },
    });

    return res.status(201).json({
      success: "Ваша оценка получена, спасибо за обратную связь",
    });
  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так",
    });
  }
};

export { estimate };
