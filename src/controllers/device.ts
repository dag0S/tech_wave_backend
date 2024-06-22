import { Response } from "express";
import prisma from "../prisma/prisma-client.js";
import {
  DeviceRequestBody,
  DeviceRequestParams,
  DeviceRequestQuery,
  IImage,
  IInfo,
  RequestBody,
  RequestParams,
  RequestQuery,
} from "./types/types.js";
import { Device, Prisma } from "@prisma/client";
import { count } from "console";

/**
 * @route POST /api/device/create
 * @desc Добавление товара
 * @access Private
 */
const create = async (req: RequestBody<DeviceRequestBody>, res: Response) => {
  try {
    const data = req.body;

    if (
      !data.name ||
      !data.price ||
      !data.brandId ||
      !data.categoryId ||
      !data.description
    ) {
      return res.status(400).json({
        message: "Все поля обязательные",
      });
    }

    const device = await prisma.device.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        brandId: data.brandId,
        categoryId: data.categoryId,
      },
    });

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

    if (data.images) {
      const images = JSON.parse(data.images);

      images.forEach((i: IImage) =>
        prisma.deviceImage.create({
          data: {
            image: i.image,
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
 * @desc Получение всех товаров + фильтрация + сортировка + поиск
 * @access Public
 */
const getAll = async (req: RequestQuery<DeviceRequestQuery>, res: Response) => {
  try {
    let {
      brandId,
      categoryId,
      limit,
      page,
      searchBy,
      priceFrom,
      priceTo,
      sortBy,
    } = req.query;

    if (page) page = +page;
    else page = 1;

    if (limit) limit = +limit;
    else limit = 9;

    let offset = page * limit - limit;

    const devicesWhere: any = {};
    const devicesOrderBy: any = {};

    // сортировка
    if (sortBy) {
      if (sortBy[0] === "-") {
        devicesOrderBy[sortBy.slice(1)] = "desc";
      } else {
        devicesOrderBy[sortBy] = "asc";
      }
    }

    // фильтрация
    if (categoryId) {
      devicesWhere["categoryId"] = +categoryId;
    }
    if (brandId) {
      devicesWhere["brandId"] = +brandId;
    }
    if (priceFrom && priceTo) {
      devicesWhere["price"] = { gte: +priceFrom, lte: +priceTo };
    }
    if (priceFrom && !priceTo) {
      devicesWhere["price"] = { gte: +priceFrom };
    }
    if (!priceFrom && priceTo) {
      devicesWhere["price"] = { lte: +priceTo };
    }

    // поиск
    if (searchBy) {
      devicesWhere["OR"] = [
        {
          name: {
            contains: searchBy,
          },
          description: {
            contains: searchBy,
          },
        },
      ];
    }

    const devices = await prisma.device.findMany({
      where: devicesWhere,
      orderBy: devicesOrderBy,
      skip: offset,
      take: limit,
    });

    const devicesCount = await prisma.device.count({
      where: devicesWhere,
      orderBy: devicesOrderBy,
      skip: offset,
      take: limit,
    });

    res.status(200).json({ devicesCount, devices });
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
const getOne = async (
  req: RequestParams<DeviceRequestParams>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const device = await prisma.device.findUnique({
      where: {
        id: +id,
      },
      include: {
        deviceInfo: true,
        deviceImages: true,
      },
    });

    if (device) {
      const updatedDevice = await prisma.device.update({
        where: {
          id: +id,
        },
        data: {
          viewsCount: {
            increment: 1,
          },
        },
      });
      res.status(200).json(updatedDevice);
    } else {
      return res.status(404).json({
        message: "Не удалось найти товар",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Не удалось получить товар",
    });
  }
};

export { create, getAll, getOne };
