const model = require("../models");
const { v4: uuidv4 } = require("uuid");

const createNewArduino = async (req, res) => {
  try {
    const result = await model.arduino.create({
      id: uuidv4(),
      data: req.body.data,
    });
    if (result) {
      res.status(201).json({
        success: true,
        massage: "Berhasil nambah data",
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: "Gagal nambah data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ masagge: error.message });
  }
};

module.exports = {
  createNewArduino,
};
