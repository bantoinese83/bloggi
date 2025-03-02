import type { NextConfig } from "next";
import dotenv from 'dotenv';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
