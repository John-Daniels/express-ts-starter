import { config } from "dotenv";
config();

require("./db/mongoose");

// const express = require("express");
import express from "express";
import morgan from 'morgan'
import cors from 'cors'
import helmet from "helmet";
import compression from "compression";


// router
import userRouter from './routers/user.route'

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(compression());

app.get("/", (req, res) => {
    res.send("welcome to your app");
});

app.use('/api/users', userRouter)

app.listen(port, () => console.log(`Server is up at port ${port}`));
