import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import fileUpload from "express-fileupload";
import path from "path";
import router from "./routes/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

const __dirname = import.meta.dirname;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);

app.listen(port, () => console.log(`Server started on port ${port}`));
