const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");

const getAllEmployees = async (req, res) => {
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
    const totalRows = await model.employe.count();
    const results = await model.employe.findAll({
      where: {
        [Op.or]: [
          {
            nama_karyawan: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      include: [
        {
          model: model.emp_pendidikan,
          as: "emppen",
        },
        {
          model: model.emp_pelatihan,
          as: "emppel",
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results.length > 0) {
      return res.status(200).json({
        success: true,
        massage: "Get All Employe",
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

const createNewEmployee = async (req, res) => {
  const newArrEmppel = [];

  if (req.body.emppel.length !== 0) {
    const arrEmppel = JSON.parse(req.body.emppel);
    for (let index = 0; index < arrEmppel.length; index++) {
      newArrEmppel.push({
        jns_pelatihan: arrEmppel[index].jns_pelatihan,
        ket: arrEmppel[index].ket,
        upload: req.files[index].path,
      });
    }
  }

  try {
    const result = await model.employe.create(
      {
        id: uuidv4(),
        NIP: req.body.NIP,
        nickname: req.body.nickname,
        nama_karyawan: req.body.nama_karyawan,
        departement_id: req.body.departement_id,
        email: req.body.email,
        alamat: req.body.alamat,
        phone: req.body.phone,
        tmptlahir: req.body.tmptlahir,
        tgllahir: new Date(req.body.tgllahir),
        id_card: req.body.id_card,
        karyawan_status: req.body.karyawan_status,
        jenis_kelamin: req.body.jenis_kelamin,
        status: req.body.status,
        kota: req.body.kota,
        starjoin: new Date(req.body.starjoin),
        sisa_cuti: req.body.sisa_cuti,
        emppen: req.body.emppen,
        emppel: newArrEmppel,
      },
      {
        include: ["emppen", "emppel"],
      }
    );
    if (result) {
      return res.status(201).json({
        success: true,
        massage: "Berhasil nambah data",
        result: result,
      });
    } else {
      res.status(404).json({
        massage: "Gagal nambah data",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const updateEmployee = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.employe.update(req.body, {
      where: {
        id: id,
      },
      force: true,
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

const updateEmppen = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.emp_pendidikan.update(req.body, {
      where: {
        id: id,
      },
      force: true,
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

const updateEmppel = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.emp_pelatihan.update(
      {
        jns_pelatihan: req.body.jns_pelatihan,
        wktu_selesai: new Date(req.body.wktu_selesai),
        ket: req.body.ket,
        upload: req.file.path,
      },
      {
        where: {
          id: id,
        },
        force: true,
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

const deleteEmployee = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const resDel = await model.employe.destroy({
      where: {
        id: id,
      },
      include: [
        {
          model: model.emp_pendidikan,
          as: "emppen",
        },
        {
          model: model.emp_pelatihan,
          as: "emppel",
        },
      ],
      force: true,
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

const getEmployee = async (req, res) => {
  try {
    const result = await model.employe.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: model.emp_pendidikan,
          as: "emppen",
        },
        {
          model: model.emp_pelatihan,
          as: "emppel",
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
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
  updateEmppen,
  updateEmppel,
};
