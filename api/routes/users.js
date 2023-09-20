const { User } = require("../models");
const { setResponse } = require("../utils");
const router = require("express").Router();
const JWT = require("jsonwebtoken");

router.post("/", (req, res) => {
  try {
    const { username, password1, password2 } = req.body;
    if (!username || !password1 || !password2) {
      return setResponse(res, "All fields are required", null, 405);
    }
    if (password1 !== password2) {
      return setResponse(res, "Both passwords should match", null, 405);
    }
    return User.findOne({ username }).then((result) => {
      if (result) {
        return setResponse(res, "Username already exist", null, 405);
      }
      const newUser = new User({ username, password: password1 });
      return newUser.save().then(() => {
        return setResponse(res, "User added", null, 201);
      });
    });
  } catch {
    return setResponse(res, "Internal server error", null, 500);
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  try {
    return User.findOne({ username, password }).then((result) => {
      if (!result) {
        return setResponse(
          res,
          "Username/Password not correct",
          { username, password },
          405
        );
      }
      const token = JWT.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            username,
          },
        },
        "arhex-labs"
      );
      return setResponse(res, "Login Successful", { token, username }, 200);
    });
  } catch {
    return setResponse(res, "Internal server error", null, 500);
  }
});

module.exports = { users: router };
