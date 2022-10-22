const model = require("../models");

const getAllProv = async (req, res) => {
  try {
    const result = await model.ec_provinces.findAll({
      attributes: ["prov_id", "prov_name"],
    });
    if (result) {
      return res.status(200).json({ succes: true, msg: result });
    } else {
      return res.status(404).json({ success: false, msg: "no data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const getAllCity = async (req, res) => {
  try {
    const result = await model.ec_cities.findAll({
      attributes: ["city_id", "city_name"],
      where: {
        prov_id: req.params.id,
      },
    });
    if (result.length > 0) {
      return res.status(200).json({ succes: true, msg: result });
    } else {
      return res.status(404).json({ success: false, msg: "no data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const getAllKec = async (req, res) => {
  try {
    const result = await model.ec_districts.findAll({
      attributes: ["dis_id", "dis_name"],
      where: {
        city_id: req.params.id,
      },
    });
    if (result.length > 0) {
      return res.status(200).json({ succes: true, msg: result });
    } else {
      return res.status(404).json({ success: false, msg: "no data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const getAllKel = async (req, res) => {
  try {
    const result = await model.ec_subdistricts.findAll({
      attributes: ["subdis_id", "subdis_name"],
      where: {
        dis_id: req.params.id,
      },
    });
    if (result.length > 0) {
      return res.status(200).json({ succes: true, msg: result });
    } else {
      return res.status(404).json({ success: false, msg: "no data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

module.exports = {
  getAllProv,
  getAllCity,
  getAllKec,
  getAllKel,
};
