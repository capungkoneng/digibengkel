const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllQuo = async (req, res) => {
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
    const totalRows = await model.quo.count();
    const results = await model.quo.findAll({
      where: {
        [Op.or]: [
          {
            quo_number: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: model.customer,
          attributes: ["nama"],
          where: {
            [Op.or]: [
              {
                nama: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
        },
        {
          model: model.quodesk, as: "quodesk"
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results) {
      return res.status(200).json({
        success: true,
        massage: "Get All Quoutation",
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
        massage: "no data",
      });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const createNewQuo = async (req, res) => {
  try {
    const result = await model.quo.create(
      {
        id: uuidv4(),
        quo_number: req.body.quo_number,
        cus_id: req.body.cus_id,
        quodesk: req.body.quodesk,
        address: req.body.address,
        city: req.body.city,
        contact: req.body.contact,
        description: req.body.description,
        tanggal_quo: new Date(req.body.tanggal_quo),
        upload: req.file.path,
      },
      {
        include: ["quodesk"],
      }
    );

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

const updateQuo = async (req, res) => {};

const deleteQuo = async (req, res) => {};

const getQuo = async (req, res) => {
  try {
    const result = await model.quo.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: model.customer, attributes: ["nama"] },
        { model: model.quodesk },
      ],
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
  getAllQuo,
  createNewQuo,
  updateQuo,
  deleteQuo,
  getQuo,
};
