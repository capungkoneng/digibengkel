const model = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const Pagination = require("../config/pagging");
const url = require("url");
const uploadToS3 = require("../config/s3Server");

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
          model: model.quodesk,
          as: "quodesk",
        },
      ],
      offset: pagination.page * pagination.perPage,
      limit: pagination.perPage,
      order: [["createdAt", "DESC"]],
    });
    if (results.length > 0) {
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
        massage: "No data",
      });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const createNewQuo = async (req, res) => {
  // const newPdf = [];

  const buffer = req.file.buffer;
  const awsRes = await uploadToS3.uploadToS3(buffer);
  if (!awsRes) {
    return res.status(500).json({ msg: "Somthing worng" });
  }
  // if (req.files && req.files.length > 0) {
  //   for (var i = 0; i < req.files.length; i++) {
  //     // console.log(req.files[i]);
  //     const s3 = await uploadToS3.uploadToS3(req.files[i].buffer);
  //     newPdf.push({
  //       buffer: s3[index].buffer,
  //     })
  //   }
  // }
  // console.log(req.files);
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
        upload: awsRes.Location,
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

const updateQuo = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });

  const buffer = req.file.buffer;
  const awsRes = await uploadToS3.uploadToS3(buffer);
  if (!awsRes) {
    return res.status(500).json({ msg: "Somthing worng" });
  }
  try {
    const result = await model.quo.update(
      {
        address: req.body.address,
        city: req.body.city,
        contact: req.body.contact,
        description: req.body.description,
        tanggal_quo: new Date(req.body.tanggal_quo),
        upload: awsRes.Location,
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

const updateQuoDesk = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const result = await model.quodesk.update(
      {
        item: req.body.item,
        vol: req.body.vol,
        unit: req.body.unit,
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

const deleteQuo = async (req, res) => {
  let id = req.params.id;
  if (!id) return res.status(404).json({ msg: "id tidak ditemukan" });
  try {
    const resDel = await model.quo.destroy({
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

const getQuo = async (req, res) => {
  try {
    const result = await model.quo.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: model.customer, attributes: ["nama"] },
        { model: model.quodesk, as: "quodesk" },
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
  updateQuoDesk,
  deleteQuo,
  getQuo,
};
