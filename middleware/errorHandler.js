const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);

  if (typeof err === "string") {
    return res.status(400).send({ msg: err });
  }
  if (typeof err === "ValidationErrors") {
    return res.status(400).send({ msg: err });
  }
  if (typeof err === "Unauthrorized") {
    return res.status(401).send({ msg: err });
  }
  return res.status(500).send({ msg: err });
};

module.exports = errorHandler;
