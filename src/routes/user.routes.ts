import { Router, Response } from "express";
import { HttpRequest } from "../models/http.model";
import User from "../models/user.model";

const router = Router();

// GET USERS
router.get("/", async (req: HttpRequest, res: Response) => {
  try {
    // Get users
    const users = await User.find();
    // Get requesting device Operating system
    console.log(req.userAgent.os);

    // The response object
    res.status(200).json({ data: users, message: "", errorText: "" });
  } catch (err) {
    // Response with status code <500: Internal server error>
    res.status(500).json({
      data: null,
      message: "There was an error fetching users",
      errorText: err.toString(),
    });
  }
});

export default router;
