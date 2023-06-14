import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_TOKEN = "abcd";

export const createNewUser = async (req, res) => {
  const { fullName, email, phone, password } = req.body ?? {};
  if (!fullName || !email || !password || !phone)
    return res.status(500).json({
      header: {
        message: "missing details",
      },
    });

  const user = await userModel.findOne({
    email,
  });
  if (user)
    return res.status(500).json({
      header: {
        message: "user already exists please login instead",
      },
    });

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      phone,
      password: encryptedPassword,
    });
    const token = jwt.sign(
      {
        id: fullName,
      },
      JWT_TOKEN
    );

    res.status(200).json({
      header: {
        message: "succesfuly created account",
      },
      body: {
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      header: {
        message: "an unkown error occured",
      },
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password)
    return res.status(400).json({
      header: {
        message: "incorrect credentials",
      },
    });

  try {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(500).json({
        header: {
          message: "user not found",
        },
      });
    }
    const verified = await bcrypt.compare(password, user.password);

    if (verified) {
      const token = jwt.sign(
        {
          id: user.fullName,
        },
        JWT_TOKEN
      );

      res.status(200).json({
        header: {
          message: "login success",
        },
        body: {
          token,
        },
      });
    } else
      return res.status(400).json({
        header: {
          message: "incorrect credentials",
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      header: {
        message: "an unkown error occured",
      },
    });
  }
};

export const verifyJWT = (req, res) => {
  console.log(req.headers["authorization"]);
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const verify = jwt.verify(token, JWT_TOKEN);
    console.log(verify);

    if (verify) res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
};
