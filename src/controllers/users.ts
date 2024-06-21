import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma/prisma-client.js";
import { generateJWT } from "../utils/generateJWT.js";
import { CustomRequest } from "../middlewares/auth.js";
import { LoginRequestBody, RegisterRequestBody, RequestBody } from "./types/types.js";

/**
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */
const login = async (req: RequestBody<LoginRequestBody>, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Пожалуйста, заполните обязательные поля" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const secret = process.env.JWT_SECRET;
    const isPasswordCorrect =
      user && (await bcrypt.compare(password, user.password));

    if (user && isPasswordCorrect && secret) {
      const token = generateJWT(user.id, user.email, user.role);

      res.status(200).json({ token });
    } else {
      return res.status(400).json({
        message: "Неверно введен логин или пароль",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Неверно введен логин или пароль",
    });
  }
};

/**
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (
  req: RequestBody<RegisterRequestBody>,
  res: Response
) => {
  try {
    const { email, password, role, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Пожалуйста, заполните обязательные поля",
      });
    }

    const registeredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (registeredUser) {
      return res.status(400).json({
        message: "Пользователь, с таким email уже существует",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
        role,
        name,
      },
    });

    const basket = await prisma.basket.create({
      data: {
        userId: user.id,
      },
    });

    const favoritesList = await prisma.favoritesList.create({
      data: {
        userId: user.id,
      },
    });

    const token = generateJWT(user.id, user.email, user.role);

    if (user) {
      res.status(201).json({ token });
    } else {
      return res
        .status(400)
        .json({ message: "Не удалось создать пользователя" });
    }
  } catch (error) {
    res.status(400).json({
      message: "Что-то пошло не так",
    });
  }
};

/**
 * @route Get /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req: CustomRequest, res: Response) => {
  if (req.user) {
    const token = generateJWT(req.user.id, req.user.email, req.user.role);
    res.status(200).json({ token });
  } else {
    res.status(400).json({
      message: "Что-то пошло не так",
    });
  }
};

export { login, register, current };
