import { Request, Response } from "express";

/**
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */
const login = async (req: Request, res: Response) => {
  res.send("login");
};

/**
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */
const register = async (req: Request, res: Response) => {
  res.send("register");
};

/**
 * @route Get /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */
const current = async (req: Request, res: Response) => {
  res.send("current");
};

export { login, register, current };
