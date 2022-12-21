const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getDepart = async (req, res) => {
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
    const totalRows = await model.departemen.count();
    const results = await model.departemen.findAll({
      attributes: ["id","kodedep", ["namadep", "name"]],
      where: {
        [Op.or]: [
          {
            namadep: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        massage: "Get All Depart",
        result: results,
        page: pagination.page,
        limit: pagination.perPage,
        totalData: totalRows,
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
    res.status(500).json({ masagge: error.message });
  }
};

const createDepart = async (req, res) => {
  try {
    const result = await model.departemen.create({
      id: uuidv4(),
      kodedep: req.body.kodedep,
      namadep: req.body.namadep,
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
    res.status(500).json({ masagge: error.message });
  }
};

const updateDepart = async (req, res) => {};

const delDepart = async (req, res) => {};

const getOneDepart = async (req, res) => {};

module.exports = {
  getDepart,
  createDepart,
  updateDepart,
  delDepart,
  getOneDepart,
};
