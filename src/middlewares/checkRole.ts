import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request<any> {
  user?: jwt.JwtPayload;
}

export const checkRole = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        return res.status(401).json({
          message: "Не авторизован",
        });
      }
  
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as jwt.JwtPayload;

      if (decoded.role !== role) {
        return res.status(403).json({
          message: "Нет доступа",
        });
      }
  
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({
        message: "Нет доступа",
      });
    }
  };
};
