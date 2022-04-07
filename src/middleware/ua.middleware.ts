import { Response, NextFunction } from "express";
import UAParser from "ua-parser-js";
import { HttpRequest } from "../models/http.model";

/**
 *
 * @param req {express.Request} Express request object
 * @param res {express.Response} Express response object
 * @param next {express.nextFunction} Express function
 *
 * This middleware the requested device information and attaches it to the the request object
 * by using the @package ua-parser-js.
 * @see https://www.npmjs.com/package/ua-parser-js
 */
export default function userAgent() {
  return function (req: HttpRequest, res: Response, next: NextFunction) {
    req.userAgent = UAParser(req.headers["user-agent"]);
    next();
  };
}
