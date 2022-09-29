const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllWor = async (req, res) => {
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
    const totalRows = await model.wor.count();
    const results = await model.wor.findAll({
      include: [
        {
          model: model.quo,
        },
        {
          model: model.employe,
        },
        {
          model: model.equipment,
        },
        {
          model: model.part_wor,
          as: "partwor"
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results) {
      return res.status(200).json({
        success: true,
        massage: "Get All wor",
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

const createNewWor = async (req, res) => {
  try {
    const result = await model.wor.create(
      {
        id: uuidv4(),
        job: req.body.job,
        quotation_id_wor: req.body.quotation_id_wor,
        nama_cus: req.body.nama_cus,
        address: req.body.address,
        tgl_wor: req.body.tgl_wor,
        contact: req.body.contact,
        kota: req.body.kota,
        email: req.body.email,
        subject: req.body.subject,
        job_description: req.body.job_description,
        contrak_spk: req.body.contrak_spk,
        nilai_kontrak: req.body.nilai_kontrak,
        sales_id_wor: req.body.sales_id_wor,
        priority_stat: req.body.priority_stat,
        qty: req.body.qty,
        unit: req.body.unit,
        tgl_order: new Date(req.body.tgl_order),
        delivery_order: new Date(req.body.delivery_order),
        ship_address: req.body.ship_address,
        estimasi_hour: req.body.estimasi_hour,
        equip_id_wor: req.body.equip_id_wor,
        partwor: req.body.partwor,
        mfg: req.body.mfg,
        Rotasi: req.body.Rotasi,
        model: req.body.model,
        power: req.body.power,
        scope_of_work: req.body.scope_of_work,
        noted: req.body.noted,
        upload: req.file.path,
      },
      {
        include: ["partwor"],
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

const updateWor = async (req, res) => {};

const deleteWor = async (req, res) => {};

const getWor = async (req, res) => {};

module.exports = {
  getAllWor,
  createNewWor,
  updateWor,
  deleteWor,
  getWor,
};
