import { Request, Response, NextFunction } from "express";
import { RateLimiterMongo } from "rate-limiter-flexible";
import mongoose from "mongoose";

/**
 *
 * @param connection Mongoose connection
 * @returns {MiddleWareFunction}
 * @description This counts and limits number of actions by key and protects from DDoS and brute force attacks at any scale.
 * @see https://www.npmjs.com/package/rate-limiter-flexible
 */

export default function rateLimiter(connection: mongoose.Connection) {
  const opts = {
    storeClient: connection,
    points: 10, // Number of points
    duration: 1, // Per second(s)
  };

  const rateLimiterMongo = new RateLimiterMongo(opts);

  return function (req: Request, res: Response, next: NextFunction) {
    rateLimiterMongo
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send("Too Many Requests");
      });
  };
}
