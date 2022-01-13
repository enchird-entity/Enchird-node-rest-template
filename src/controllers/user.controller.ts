import {Router, Request, Response} from "express";
import User from "../models/user.model";

const router = Router();


// GET USERS
router.get('/', async (req: Request, res: Response) => {
    try {
        // Get users
        const users = await User.find();

        // The response object
        res.status(200).json({data: users, message: '', errorText: ''})

    } catch (err) {
        // Response with status code <500: Internal server error>
        res.status(500).json({data: null, message: 'There was an error fetching users', errorText: err.toString()})
    }
});



export default router;
