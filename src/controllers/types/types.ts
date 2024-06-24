import { Request } from "express";
import jwt from "jsonwebtoken";

export type RequestBody<T> = Request<{}, {}, T>;
export type RequestQuery<T> = Request<{}, {}, {}, T>;
export type RequestParams<T> = Request<T>;

// users
export interface LoginRequestBody {
  email: string;
  password: string;
}
export interface RegisterRequestBody {
  email: string;
  name: string;
  password: string;
  role?: string;
}

// category
export interface CategoryRequestBody {
  name: string;
}

// brand
export interface BrandRequestBody {
  name: string;
}

// device
export interface DeviceRequestBody {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  brandId: number;
  info?: string;
  images?: string;
}

export interface IInfo {
  title: string;
  description: string;
}

export interface IImage {
  image: string;
}

type NumOrStr = string | number;

export interface DeviceRequestQuery {
  brandId?: NumOrStr;
  categoryId?: NumOrStr;
  sortBy?: string;
  priceFrom?: NumOrStr;
  priceTo?: NumOrStr;
  searchBy?: string;
  limit?: NumOrStr;
  page?: NumOrStr;
}

export interface DeviceRequestParams {
  id: string;
}

// favorites
export interface FavoriteRequestBody {
  id: number;
}

export interface FavoriteRequestParams {
  id: string;
}

export interface FavoriteRequestBodyWithUser extends RequestBody<FavoriteRequestBody> {
  user?: jwt.JwtPayload;
}

export interface FavoriteRequestParamsWithUser extends RequestParams<FavoriteRequestParams> {
  user?: jwt.JwtPayload;
}

