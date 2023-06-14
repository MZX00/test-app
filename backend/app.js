import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import userRoute from "./routes/user.js";
import cors from "cors";

const app = express();

const port = 8000;

const mongoUri =
  "mongodb+srv://admin:rkqC3cyQMZSuVkNq@tajziya.ztf8a.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());
app.use(bodyparser.json());
app.use(userRoute);

mongoose.connect(mongoUri, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.log("error"));
db.once("connection", () => console.log("connected to db"));

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
