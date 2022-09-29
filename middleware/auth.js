const jwt = require("jsonwebtoken");
const model = require("../models");
require("dotenv").config();

const TOKEN_KEY = process.env.ACCESS_TOKEN;

function authToken(roles) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader || req.session.token) {
      const token = authHeader ? authHeader.split(" ")[1] : req.session.token;
      jwt.verify(token, TOKEN_KEY, (err, userToken) => {
        if (err) return res.sendStatus(403);
        model.user
          .findOne({
            where: {
              id: userToken.data,
            },
          })
          .then((result) => {
            req.session.token = token;
            req.session.userId = userToken.data;

            if (
              result.role_name === roles.admin ||
              result.role_name === roles.hrd
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

function generateToken(username) {
  return jwt.sign({ data: username }, TOKEN_KEY, {
    expiresIn: "1h",
  });
}

module.exports = {
  authToken,
  generateToken,
};
