const model = require("../models");
const { Op } = require("sequelize");

const getAllProv = async (req, res) => {
  try {
    const result = await model.ec_provinces.findAll({
      attributes: ["prov_id", ["prov_name", "name"]],
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
  const search = req.query.search || "";

  try {
    const result = await model.ec_cities.findAll({
      attributes: ["city_id", ["city_name", "name"]],
      include: [
        {
          model: model.ec_provinces,
          attributes: ["prov_id", ["prov_name", "name"]],
          as: "city",
          where: {
            [Op.or]: [
              {
                prov_name: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
        },
      ],
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
  const search = req.query.search || "";

  try {
    const result = await model.ec_districts.findAll({
      attributes: ["dis_id", ["dis_name", "name"]],
      include: [
        {
          model: model.ec_cities,
          attributes: ["city_id", ["city_name", "name"]],
          as: "distric",
          where: {
            [Op.or]: [
              {
                city_name: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
        },
      ],
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
  const search = req.query.search || "";

  try {
    const result = await model.ec_subdistricts.findAll({
      attributes: ["subdis_id", ["subdis_name", "name"]],
      include: [
        {
          model: model.ec_districts,
          attributes: ["dis_id", ["dis_name", "name"]],
          as: "subdis",
          where: {
            [Op.or]: [
              {
                dis_name: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
        },
      ],
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

const getOneCusKontak = async (req, res) => {
  const search = req.query.search || "";

  try {
    const result = await model.cus_kontak.findAll({
      as: "cuskontak",
      where: {
        customer_id: search,
      },
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

const getALamatCus = async (req, res) => {
  const search = req.query.search || "";

  try {
    const result = await model.address_cus.findAll({
      as: "addrescus",
      where: {
        cus_id: search,
      },
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

module.exports = {
  getAllProv,
  getAllCity,
  getAllKec,
  getAllKel,
  getOneCusKontak,
  getALamatCus,
};
