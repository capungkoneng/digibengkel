const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllCustommer = async (req, res) => {
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
    const totalRows = await model.customer.count();
    const results = await model.customer.findAll({
      where: {
        [Op.or]: [
          {
            nama: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: model.cus_kontak,
          as: "cuskontak",
        },
        {
          model: model.address_cus,
          as: "addrescus",
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        massage: "Get All Custommer",
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

const createNewCustommer = async (req, res) => {
  const newArrEmppel = [];

  if (req.body.cuskontak.length !== 0) {
    const arrEmppel = req.body.cuskontak;
    for (let index = 0; index < arrEmppel.length; index++) {
      newArrEmppel.push({
        contact_person: arrEmppel[index].contact_person,
        email_person: arrEmppel[index].email_person,
        contact_person_telp: arrEmppel[index].contact_person_telp,
      });
    }
  }
  try {
    const result = await model.customer.create(
      {
        id: uuidv4(),
        id_customer: req.body.id_customer,
        nama: req.body.nama,
        email: req.body.email,
        addrescus: req.body.addrescus,
        cuskontak: newArrEmppel,
      },
      {
        include: ["cuskontak", "addrescus"],
      }
    );
    if (result) {
      res.status(201).json({
        success: true,
        massage: "Berhasil Nambah Data",
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

const updateCustommer = async (req, res) => {
  let id = req.params.id;

  try {
    const result = await model.customer.update(req.body, {
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

const updateCusKontak = async (req, res) => {
  let id = req.params.id;

  try {
    const result = await model.cus_kontak.update(
      {
        contact_person: req.body.contact_person,
        email_person: req.body.email_person,
        contact_person_telp: req.body.contact_person_telp,
      },
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );
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

const updateCusAdrees = async (req, res) => {
  let id = req.params.id;

  try {
    const result = await model.address_cus.update(req.body, {
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

const deleteCustommer = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const resDel = await model.customer.destroy({
      where: {
        id: id,
      },
    });
    if (resDel) {
      res.status(200).json({ success: true, massage: "berhasil di hapus" });
    } else {
      res.status(404).json({ success: false, massage: "gagal delete" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const getOneCustommer = async (req, res) => {
  try {
    const result = await model.customer.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: model.cus_kontak,
          as: "cuskontak",
        },
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
  getAllCustommer,
  createNewCustommer,
  updateCustommer,
  updateCusKontak,
  deleteCustommer,
  getOneCustommer,
  updateCusAdrees,
};
