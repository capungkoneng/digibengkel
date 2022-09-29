const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllequip = async (req, res) => {
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
    const totalRows = await model.equipment.count();
    const results = await model.equipment.findAll({
      where: {
        [Op.or]: [
          {
            equip_nama: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: model.part,
          as: "equipmen",
          where: {
            [Op.or]: [
              {
                part_nama: {
                  [Op.like]: "%" + search + "%",
                },
              },
            ],
          },
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results) {
      return res.status(200).json({
        success: true,
        massage: "Get All Equipment",
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

const createNewEquip = async (req, res) => {
  try {
    const result = await model.equipment.create(
      {
        id: uuidv4(),
        id_equipment: req.body.id_equipment,
        equip_nama: req.body.equip_nama,
        description: req.body.description,
        equipmen: req.body.equipmen,
      },
      {
        include: ["equipmen"],
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

const updateEquip = async (req, res) => {};

const delEquip = async (req, res) => {};

const getEquip = async (req, res) => {};

module.exports = {
  getAllequip,
  createNewEquip,
  updateEquip,
  delEquip,
  getEquip,
};
