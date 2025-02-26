import { Request, Response, NextFunction } from 'express';
import { config } from '../config';


export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      error: 'API key is required'
    });
  }
  
  if (!config.clientApiKeys.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden',
      error: 'Invalid API key'
    });
  }

  next();
};