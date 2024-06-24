import jwt from "jsonwebtoken";

export const generateJWT = (
  id: number,
  email: string,
  name: string,
  role: string,
  basket: number,
  favoritesList: number
) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign(
    { id, email, name, role, basket, favoritesList },
    secret as string,
    {
      expiresIn: "24h",
    }
  );
};
