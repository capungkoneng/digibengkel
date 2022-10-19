const model = require("../models");
const { Op } = require("sequelize");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllProv = async (req, res) => {
  try {
    const search = req.query.search || "";
    const hostname = req.headers.host;
    const pathname = url.parse(req.url).pathname;
    const pagination = new Pagination(
      req.query.page,
      req.query.perPage,
      hostname,
      pathname
    );
    const results = await model.ec_provinces.findAll({
      attributes: ["prov_id", "prov_name"],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
    });
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        massage: "Get All Prov",
        result: results,
        page: pagination.page,
        limit: pagination.perPage,
        currentPage: pagination.currentPage,
        nextPage: pagination.next(),
        previouspage: pagination.prev(),
      });
    } else {
      return res.status(404).json({
        success: false,
        massage: "No data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ masagge: error.message });
  }
};

const getAllCity = async (req, res) => {
  try {
    const result = await model.ec_cities.findAll({
      attributes: ["city_id", "city_name", "prov_id"],
      where: {
        prov_id: req.params.id,
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

const getAllKec = async (req, res) => {
};

module.exports = {
  getAllProv,
  getAllCity,
  getAllKec
};
