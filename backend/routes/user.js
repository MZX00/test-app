import express from "express";
import { createNewUser, loginUser, verifyJWT } from "../controllers/user.js";

const route = express.Router();

route.post("/signup", createNewUser);

route.post("/login", loginUser);

route.post("/verifyJWT", verifyJWT);

export default route;
