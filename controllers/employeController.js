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
        {
          model: model.employchild,
          as: "empchild",
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
  const newArrEmmpen = [];
  const newArrEmchild = [];
  const newArrEmppel = [];

  if (req.body.emppel.length !== 0) {
    const arrEmppel = JSON.parse(req.body.emppel);
    for (let index = 0; index < arrEmppel.length; index++) {
      newArrEmppel.push({
        jns_pelatihan: arrEmppel[index].jns_pelatihan,
        ket: arrEmppel[index].ket,
        wktu_selesai: arrEmppel[index].wktu_selesai,
        upload: req.files[index].path,
      });
    }
  }
  if (req.body.empchild.length !== 0) {
    const arrEmchild = JSON.parse(req.body.empchild);
    for (let index = 0; index < arrEmchild.length; index++) {
      newArrEmchild.push({
        name_child: arrEmchild[index].name_child,
        jenis_kelamin: arrEmchild[index].jenis_kelamin,
        tmpt_lahir: arrEmchild[index].tmpt_lahir,
        tgllahir: arrEmchild[index].tgllahir,
      });
    }
  }
  if (req.body.emppen.length !== 0) {
    const arrEmmpen = JSON.parse(req.body.emppen);
    for (let index = 0; index < arrEmmpen.length; index++) {
      newArrEmmpen.push({
        jns_pndidikan: arrEmmpen[index].jns_pndidikan,
        nama_sekolah: arrEmmpen[index].nama_sekolah,
        thun_lulus: arrEmmpen[index].thun_lulus,
      });
    }
  }

  try {
    const result = await model.employe.create(
      {
        id: uuidv4(),
        nik: req.body.nik,
        nickname: req.body.nickname,
        nama_karyawan: req.body.nama_karyawan,
        departement_id: req.body.departement_id,
        email: req.body.email,
        alamat: req.body.alamat,
        kota: req.body.kota,
        provinsi: req.body.provinsi,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        kodepos: req.body.kodepos,
        phone: req.body.phone,
        tmptlahir: req.body.tmptlahir,
        tgllahir: new Date(req.body.tgllahir),
        id_card: req.body.id_card,
        karyawan_status: req.body.karyawan_status,
        jenis_kelamin: req.body.jenis_kelamin,
        status: req.body.status,
        starjoin: new Date(req.body.starjoin),
        sisa_cuti: req.body.sisa_cuti,
        emppen: newArrEmmpen,
        emppel: newArrEmppel,
        spouse_name: req.body.spouse_name,
        jenis_kelamin_spouse: req.body.jenis_kelamin_spouse,
        tmpt_lahir_spouse: req.body.tmpt_lahir_spouse,
        tgllahir_spouse: req.body.tgllahir_spouse,
        empchild: newArrEmchild,
      },
      {
        include: ["emppen", "emppel", "empchild"],
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
    const result = await model.employe.update(
      {
        id: uuidv4(),
        nik: req.body.nik,
        nickname: req.body.nickname,
        nama_karyawan: req.body.nama_karyawan,
        departement_id: req.body.departement_id,
        email: req.body.email,
        alamat: req.body.alamat,
        kota: req.body.kota,
        provinsi: req.body.provinsi,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        kodepos: req.body.kodepos,
        phone: req.body.phone,
        tmptlahir: req.body.tmptlahir,
        tgllahir: new Date(req.body.tgllahir),
        id_card: req.body.id_card,
        karyawan_status: req.body.karyawan_status,
        jenis_kelamin: req.body.jenis_kelamin,
        status: req.body.status,
        starjoin: new Date(req.body.starjoin),
        sisa_cuti: req.body.sisa_cuti,
        spouse_name: req.body.spouse_name,
        jenis_kelamin_spouse: req.body.jenis_kelamin_spouse,
        tmpt_lahir_spouse: req.body.tmpt_lahir_spouse,
        tgllahir_spouse: req.body.tgllahir_spouse,
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

const updateEmppen = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.emp_pendidikan.update(req.body, {
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

const updateChild = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.employchild.update(req.body, {
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
  updateChild,
  updateEmppel,
};
