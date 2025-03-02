import type { NextConfig } from "next";
import dotenv from 'dotenv';

dotenv.config();

let logger: any;

if (typeof window === 'undefined') {
  (async () => {
    const winston = await import('winston');
    const DailyRotateFile = (await import('winston-daily-rotate-file')).default;

    logger = winston.createLogger({
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
  })();
}

const nextConfig: NextConfig = {
  /* config options here */
};

export { logger };
export default nextConfig;
