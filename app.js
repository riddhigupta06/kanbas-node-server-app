import express from 'express';
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import Hello from "./hello.js"
import Lab5 from './lab5.js';
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";

mongoose.connect(process.env.MONGOOSE_CONNECTION_URL);

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};

app.use(
    session(sessionOptions)
);  

app.use(express.json());

Hello(app)
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);

app.listen(process.env.PORT || 4000);