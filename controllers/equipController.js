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
          as: "part",
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results.length > 0) {
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
        massage: "No data",
      });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const createNewEquip = async (req, res) => {
  try {
    const result = await model.equipment.create({
      id: uuidv4(),
      id_equipment: req.body.id_equipment,
      equip_nama: req.body.equip_nama,
      description: req.body.description,
      upload: req.file.path,
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

const createPart = async (req, res) => {
  const newArrPart = [];

  if (req.body.part.length !== 0) {
    const arrPart = JSON.parse(req.body.part);
    for (let index = 0; index < arrPart.length; index++) {
      newArrPart.push({
        part_nama: arrPart[index].part_nama,
        description: arrPart[index].description,
        equip_id: arrPart[index].equip_id,
        upload: req.file[index].path,
      });
    }
  }
  try {
    const result = await model.part.create({
      id: uuidv4(),
      part: newArrPart,
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

const updateEquip = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.equipment.update(
      {
        id_equipment: req.body.id_equipment,
        equip_nama: req.body.equip_nama,
        description: req.body.description,
        upload: req.file.path,
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

const updateEquipPart = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.part.update(
      {
        part_nama: req.body.part_nama,
        description: req.body.description,
        upload: req.file.path,
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

const delEquip = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const resDel = await model.equipment.destroy({
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

const getEquip = async (req, res) => {
  try {
    const result = await model.equipment.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: model.part,
          as: "part",
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
  getAllequip,
  createNewEquip,
  createPart,
  updateEquip,
  updateEquipPart,
  delEquip,
  getEquip,
};
