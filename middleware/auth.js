const jwt = require("jsonwebtoken");
const model = require("../models");
require("dotenv").config();

const TOKEN_KEY = process.env.ACCESS_TOKEN;

function authToken(roles) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader || req.session.token) {
      const token = authHeader ? authHeader.split(" ")[1] : req.session.token;
      jwt.verify(token, TOKEN_KEY, async (err, userToken) => {
        if (err) return res.sendStatus(403);
        await model.user
          .findOne({
            attributes: ["id", "username", "role_name"],
            where: {
              id: userToken.data,
            },
          })
          .then((result) => {
            req.session.token = token;
            req.session.userId = userToken.data;

            if (
              result.role_name === roles.admin ||
              result.role_name === roles.hrd ||
              result.role_name === roles.it
            ) {
              next();
            } else {
              return res.status(401).json({ msg: `maaf tidak bisa masuk` });
            }
          });
      });
    } else {
      return res.status(401).json({ msg: "anda belum login" });
    }
  };
}

function generateToken(user_id) {
  return jwt.sign({ data: user_id }, TOKEN_KEY, {
    expiresIn: "1d",
  });
}

module.exports = {
  authToken,
  generateToken,
};
