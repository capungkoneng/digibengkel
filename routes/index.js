const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/cloudinary");
const uploadto = require("../config/s3Server");

const usersController = require("../controllers/usersController");
const departController = require("../controllers/departController");
const custommerController = require("../controllers/custommerController");
const employeController = require("../controllers/employeController");
const supplierController = require("../controllers/supplierController");
const qutationController = require("../controllers/quotationController");
const equipController = require("../controllers/equipController");
const worController = require("../controllers/worController");
const addressController = require("../controllers/addressController");
const mrController = require("../controllers/mrController");

/***************************AUTH********************************* */

router.post("/signup", usersController.registerNewUsers);
router.post("/signin", usersController.loginUsers);
router.delete(
  "/signout",
  auth.authToken({ admin: "admin", hrd: "hrd" }),
  usersController.logoutUsers
);
/***************************AUTH********************************* */

/***************************USER********************************* */

router.get(
  "/users",
  auth.authToken({ admin: "admin", hrd: "hrd", it: "IT" }),
  usersController.getAllUsers
);
router.get("/users/:id", usersController.getUsers);

/***************************USER********************************* */

/***************************DEPARTEMENT********************************* */

router.get("/depart", departController.getDepart);
router.post("/depart", departController.createDepart);
router.put("/depart/:id", departController.updateDepart);
router.delete("/depart/:id", departController.delDepart);
router.get("/depart/:id", departController.delDepart);

/***************************DEPARTEMENT********************************* */

/***************************CUSTOMER********************************* */

router.get("/customer", custommerController.getAllCustommer);
router.post("/customer", custommerController.createNewCustommer);
router.put("/customer/:id", custommerController.updateCustommer);
router.put("/customer/cuskontak/:id", custommerController.updateCusKontak);
router.delete("/customer/:id", custommerController.deleteCustommer);
router.get("/customer/:id", custommerController.getOneCustommer);
router.put("/customer/address/:id", custommerController.updateCusAdrees);

/***************************CUSTOMER********************************* */

/***************************EMPLOYE********************************* */

router.get("/employe", employeController.getAllEmployees);
router.post(
  "/employe",
  upload.array("upload", 1000),
  employeController.createNewEmployee
);
router.put("/employe/:id", employeController.updateEmployee);
router.delete("/employe/:id", employeController.deleteEmployee);
router.get("/employe/:id", employeController.getEmployee);
router.put("/employe/emppen/:id", employeController.updateEmppen);
router.put(
  "/employe/emppel/:id",
  upload.single("upload"),
  employeController.updateEmppel
);
router.put("/employe/empchild/:id", employeController.updateChild);

/***************************EMPLOYE********************************* */

/***************************SUPPLIER********************************* */

router.get("/supplier", supplierController.getAllSupplier);
router.post("/supplier", supplierController.createNewSupplier);
router.put("/supplier/:id", supplierController.updateSupplier);
router.put("/supplier/cusop/:id", supplierController.updatecuSup);
router.put("/supplier/suprek/:id", supplierController.updaterekSup);
router.delete("/supplier/:id", supplierController.deleteSupplier);
router.get("/supplier/:id", supplierController.getSupplier);

/***************************SUPPLIER********************************* */

/***************************QUOTATION********************************* */

router.get("/quotation", qutationController.getAllQuo);
router.post(
  "/quotation",
  upload.single("upload"),
  qutationController.createNewQuo
);
router.put(
  "/quotation/:id",
  upload.single("upload"),
  qutationController.updateQuo
);
router.put("/quotation/quodes/:id", qutationController.updateQuoDesk);
router.delete("/quotation/:id", qutationController.deleteQuo);
router.get("/quotation/:id", qutationController.getQuo);

/***************************QUOTATION********************************* */

/***************************EQUIPMENT********************************* */

router.get("/equipment", equipController.getAllequip);
router.post(
  "/equipment",
  upload.single("upload"),
  equipController.createNewEquip
);
router.post(
  "/equipment/part",
  upload.array("upload"),
  equipController.createPart
);
router.put(
  "/equipment/:id",
  upload.single("upload"),
  equipController.updateEquip
);
router.put(
  "/equipment/part/:id",
  upload.single("upload"),
  equipController.updateEquipPart
);
router.delete("/equipment/:id", equipController.delEquip);
router.get("/equipment/:id", equipController.getEquip);
router.get("/equipment/eq/:id", equipController.getEqPar);
router.get("/part", equipController.getPart);
router.delete("/equipment/part/:id", equipController.delPart);

/***************************EQUIPMENT********************************* */

/***************************WOR********************************* */

router.get("/wor", worController.getAllWor);
router.post(
  "/wor",
  upload.single("upload"),
  worController.createNewWor
);
router.put(
  "/wor/:id",
  upload.single("upload"),
  worController.updateWor
);
router.delete("/wor/:id", worController.deleteWor);
router.get("/wor/:id", worController.getWor);

/***************************WOR********************************* */

/***************************ADRESS********************************* */

router.get("/address/prov", addressController.getAllProv);
router.get("/address/city", addressController.getAllCity);
router.get("/address/dis", addressController.getAllKec);
router.get("/address/subdis", addressController.getAllKel);
router.get("/cusKontakQuo", addressController.getOneCusKontak);
router.get("/addressQuo", addressController.getALamatCus);

/***************************ADRESS********************************* */

/***************************MR********************************* */

router.get("/mrtype", mrController.getAllMrtype);
router.post("/mrtype", mrController.addMrtype);
router.post("/mrnama", mrController.addMrnama);
router.post("/mrmaster", mrController.addMrMaster);
router.get("/mrnama/:id", mrController.getAllMrnama);

/***************************MR********************************* */

module.exports = router;
