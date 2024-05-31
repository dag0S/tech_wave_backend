import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import prisma from "../prisma/prisma-client.js";
import { off } from "process";

/**
 * @route POST /api/device/create
 * @desc Добавление товара
 * @access Private
 */
const create = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const { img }: any = req.files;

    let fileName = uuidv4() + ".jpg";
    const __dirname = import.meta.dirname;

    img.mv(path.resolve(__dirname, "..", "static", fileName));

    if (!data.name || !data.price || !data.brandId || !data.typeId) {
      return res.status(400).json({
        message: "Все поля обязательные",
      });
    }

    const device = await prisma.device.create({
      data: {
        name: data.name,
        price: parseInt(data.price),
        brandId: parseInt(data.brandId),
        typeId: parseInt(data.typeId),
        img: fileName,
      },
    });

    interface IInfo {
      title: string;
      description: string;
    }

    if (data.info) {
      const info = JSON.parse(data.info);
      info.forEach((i: IInfo) =>
        prisma.deviceInfo.create({
          data: {
            title: i.title,
            description: i.description,
            deviceId: device.id,
          },
        })
      );
    }

    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({
      message: `Что-то пошло не так`,
    });
  }
};

/**
 * @route GET /api/device/
 * @desc Получение всех товаров + фильтрация
 * @access Public
 */
const getAll = async (req: Request, res: Response) => {
  try {
    let { brandId, typeId, limit, page }: any = req.query;
    page = +page || 1;
    limit = +limit || 9;
    let offset = page * limit - limit;
    let devices;

    // /api/device/
    if (!brandId && !typeId) {
      devices = await prisma.device.findMany({
        take: limit,
        skip: offset,
      });
    }

    // /api/device/?brandId=1
    if (brandId && !typeId && typeof brandId === "string") {
      devices = await prisma.device.findMany({
        where: {
          brandId: parseInt(brandId),
        },
        skip: offset,
        take: limit,
      });
    }

    // /api/device/?typeId=1
    if (!brandId && typeId && typeof typeId === "string") {
      devices = await prisma.device.findMany({
        where: {
          typeId: parseInt(typeId),
        },
        skip: offset,
        take: limit,
      });
    }

    // /api/device/?brandId=1&typeId=1
    if (
      brandId &&
      typeId &&
      typeof typeId === "string" &&
      typeof brandId === "string"
    ) {
      devices = await prisma.device.findMany({
        where: {
          brandId: parseInt(brandId),
          typeId: parseInt(typeId),
        },
        skip: offset,
        take: limit,
      });
    }

    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить товары",
    });
  }
};

/**
 * @route GET /api/device/:id
 * @desc Получение одного товара
 * @access Public
 */
const getOne = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const device = await prisma.device.findUnique({
      where: {
        id: +id,
      },
      include: {
        deviceInfo: true,
      },
    });

    res.status(200).json(device);
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось получить товар",
    });
  }
};

export { create, getAll, getOne };
