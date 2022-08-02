import { Request, Response, NextFunction } from "express";
import User from "../models/User.model";

const jwt = require('jsonwebtoken');

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split('Bearer ')[1];

    const decoded: any = jwt.verify(token, process.env.JWT_SEC)
    if (!decoded) return res.status(403).send({ error: "Please Authenticate" })

    const user = await User.findOne({ id: decoded._id, 'tokens.token': token })


    if (!user) return res.status(404).send({ error: 'Sorry but this user is not found!' })

    req.user = user
    req.token = token

    next()
}

