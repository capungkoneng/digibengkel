const model = require("../models");
const auth = require("../middleware/auth");
const argon2 = require("argon2");
const ip = require("ip");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const result = await model.session.findAll({
      include: [
        {
          model: model.user,
          required: true,
          right: true, // has no effect, will create an inner join
        },
      ],
    });
    if (result.length > 0) {
      return res.status(200).json({ succes: true, result: result });
    } else {
      return res.status(404).json({ succes: false, masagge: "No data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const registerNewUsers = async (req, res) => {
  const { role_name, username, email, password, fullName, phone } = req.body;
  try {
    const user = await model.user.findOne({
      where: { username: req.body.username },
    });
    if (user) {
      return res.status(403).json({ msg: "User already registered" });
    }
    const hashpass = await argon2.hash(password);
    const result = await model.user.create({
      id: uuidv4(),
      role_name: role_name,
      username: username,
      password: hashpass,
      email: email,
      fullName: fullName,
      phone: phone,
      createdAt: new Date(),
    });
    const resResult = {
      role_name: result.role_name,
      username: result.username,
      id: result.id,
    };
    return res.status(201).json({ msg: true, result: resResult });
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const loginUsers = async (req, res) => {
  try {
    const user = await model.user.findOne({
      where: { username: req.body.username },
    });
    if (!user) {
      return res.status(403).json("username tidak ada / belum daftar");
    }
    const passwordIsValid = await argon2.verify(
      user.password,
      req.body.password
    );
    if (!passwordIsValid) {
      return res.status(403).json("salah password");
    }

    const token = auth.generateToken(user.id);
    const userSession = await model.session.create({
      id: uuidv4(),
      user_id: user.id,
      ip_address: ip.address(),
      acces_token: token,
      is_bloked: false,
      refresh_token: null,
    });
    const Resresult = {
      id: user.id,
      username: user.username,
      role_name: user.role_name,
      session: userSession,
    };
    return res.status(200).json({ msg: true, result: Resresult });
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

const logoutUsers = async (req, res) => {
  try {
    const sessionDel = await model.session.destroy({
      where: {
        user_id: id,
      },
    });
    if (sessionDel) {
      req.session.token = "";
      return res.status(200).json({ success: true, msg: "berhasil logout " });
    } else {
      return res.status(200).json({ success: false, msg: "gagal logout" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.masagge });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await model.session.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    if (result.length > 0) {
      return res.status(200).json({ success: true, result: result });
    } else {
      return res.status(404).json({ success: false, msg: "no data" });
    }
  } catch (error) {
    res.status(500).json({ masagge: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerNewUsers,
  loginUsers,
  logoutUsers,
  getUsers,
};
