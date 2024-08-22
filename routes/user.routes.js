const multer = require("multer");
const express = require("express");
const router = express.Router();
const { importExcelData, exportExcelData } = require("../controller/user.controller");


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/import", upload.single("file"), importExcelData);
router.get("/export", exportExcelData);



module.exports = router;