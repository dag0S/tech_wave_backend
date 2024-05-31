import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from 'morgan';
import router from "./routes/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(port, () => console.log(`Server started on port ${port}`));
