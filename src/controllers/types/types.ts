import { Request } from "express";

export type RequestBody<T> = Request<{}, {}, T>;

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

export type RequestQuery<T> = Request<{}, {}, {}, T>;

type NumOrStr = string | number | undefined;

export interface DeviceRequestQuery {
  brandId?: NumOrStr;
  categoryId?: NumOrStr;
  limit?: NumOrStr;
  page?: NumOrStr;
}

export type RequestParams<T> = Request<T>;

export interface DeviceRequestParams {
  id: string;
}
