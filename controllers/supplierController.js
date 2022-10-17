const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllSupplier = async (req, res) => {
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
    const totalRows = await model.supplier.count();
    const results = await model.supplier.findAll({
      where: {
        [Op.or]: [
          {
            sup_name: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: model.consuplier,
          as: "cuskontak",
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        massage: "Get All Supplier",
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

const createNewSupplier = async (req, res) => {
  try {
    const result = await model.supplier.create(
      {
        id: uuidv4(),
        suplier_type: req.body.suplier_type,
        id_suplier: req.body.id_suplier,
        npwp: req.body.npwp,
        sup_name: req.body.sup_name,
        alamat: req.body.alamat,
        kota: req.body.kota,
        phone: req.body.phone,
        email: req.body.email,
        bank_akun: req.body.bank_akun,
        akun_name: req.body.akun_name,
        akun_number: req.body.akun_number,
        contact_person_sup: req.body.contact_person_sup,
        ppn: req.body.ppn,
        pph: req.body.pph,
        cuskontak: req.body.cuskontak,
      },
      {
        include: ["cuskontak"],
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

const updateSupplier = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.supplier.update(req.body, {
      where: {
        id: id,
      },
      returning: true,
    });
    if (result) {
      res.status(201).json({
        success: true,
        massage: "Berhasil update data",
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: "Gagal update data",
      });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const updatecuSup = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.consuplier.update(req.body, {
      where: {
        id: id,
      },
      returning: true,
    });
    if (result) {
      res.status(201).json({
        success: true,
        message: "Berhasil update data",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: "Gagal update data",
      });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const deleteSupplier = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const resDel = await model.supplier.destroy({
      where: {
        id: id,
      },
    });
    if (resDel) {
      res.status(200).json({ success: true, massage: "berhasil di hapus" });
    } else {
      res.status(404).json({ success: true, massage: "gagal delete" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const getSupplier = async (req, res) => {
  try {
    const result = await model.supplier.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: model.consuplier,
          as: "cosup",
        },
      ],
    });
    if (result) {
      return res.status(200).json({ success: true, msg: result });
    } else {
      return res.status(404).json({ success: false, msg: "no data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

module.exports = {
  getAllSupplier,
  createNewSupplier,
  updateSupplier,
  updatecuSup,
  deleteSupplier,
  getSupplier,
};
