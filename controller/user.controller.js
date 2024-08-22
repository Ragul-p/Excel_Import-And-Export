const XLSX = require("xlsx");
const path = require("path");
const User = require("../model/user.model");
const fs = require("fs");

async function importExcelData(req, res) {
    try {

        if (!req.file) { return res.status(400).json({ message: "No file uploaded." }) };

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        for (let i = 0; i < jsonData.length; i++) {
            const { userCode, firstName, lastName, email } = jsonData[i];

            const existingUser = await User.findOne({ where: { userCode } });
            if (existingUser) { await existingUser.update({ firstName, lastName, email }); }
            else { await User.create({ userCode, firstName, lastName, email }); }
        }

        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

async function exportExcelData(req, res) {
    try {
        const users = await User.findAll({ order: [["id", "ASC"]] });
        const jsonData = users.map((data) => data.toJSON());

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const filePath = path.join(__dirname, "Users.xlsx");
        XLSX.writeFile(workbook, filePath);

        return res.download(filePath, "Users.xlsx", async (err) => {
            if (err) { return res.status(500).json({ message: "server error" }); }
            else {
                fs.unlink(filePath, (err) => {
                    if (err) { console.log(err); }
                });
                console.log("file delete successfully !");
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


module.exports = { importExcelData, exportExcelData };