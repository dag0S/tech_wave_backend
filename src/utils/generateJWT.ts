import jwt, { Secret } from "jsonwebtoken";

export const generateJWT = (id: number, email: string, role: string) => {
  const secret  = process.env.JWT_SECRET ;
  return jwt.sign({ id, email, role }, secret as string, {
    expiresIn: "24h",
  });
};
