import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ message: 'Token not provided.' });
  }

  const [, token] = authToken.split(' ');

  jwt.verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
    if (err) {
      return response.status(401).json({ message: 'Token is invalid.' });
    }

    request.userId = decoded?.id;
  });

  next();
}
