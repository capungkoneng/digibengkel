const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../config/cloudinary");

const usersController = require("../controllers/usersController");
const departController = require("../controllers/departController");
const custommerController = require("../controllers/custommerController");
const employeController = require("../controllers/employeController");
const supplierController = require("../controllers/supplierController");
const qutationController = require("../controllers/quotationController");
const equipController = require("../controllers/equipController");
const worController = require("../controllers/worController");

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
  auth.authToken({ admin: "admin", hrd: "hrd" }),
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
/***************************CUSTOMER********************************* */

/***************************EMPLOYE********************************* */
router.get("/employe", employeController.getAllEmployees);
router.post(
  "/employe",
  upload.array("upload"),
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
/***************************EMPLOYE********************************* */

/***************************SUPPLIER********************************* */
router.get("/supplier", supplierController.getAllSupplier);
router.post("/supplier", supplierController.createNewSupplier);
router.put("/supplier/:id", supplierController.updateSupplier);
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
router.put("/quotation/:id", qutationController.updateQuo);
router.put("/quotation/quodes/:id", qutationController.updateQuoDesk);
router.delete("/quotation/:id", qutationController.deleteQuo);
router.get("/quotation/:id", qutationController.getQuo);
/***************************QUOTATION********************************* */

/***************************EQUIPMENT********************************* */
router.get("/equipment", equipController.getAllequip);
router.post("/equipment", equipController.createNewEquip);
router.put("/equipment/:id", equipController.updateEquip);
router.put("/equipment/part/:id", equipController.updateEquipPart);
router.delete("/equipment/:id", equipController.delEquip);
router.get("/equipment/:id", equipController.getEquip);
/***************************EQUIPMENT********************************* */

/***************************WOR********************************* */
router.get("/wor", worController.getAllWor);
router.post("/wor", upload.single("upload"), worController.createNewWor);
router.put("/wor/:id", worController.updateWor);
router.delete("/wor/:id", worController.deleteWor);
router.get("/wor/:id", worController.getWor);
/***************************WOR********************************* */

module.exports = router;
