const User = require("../model/user.model");


async function getHomePage(req, res) {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    res.render("index", { users });
}



module.exports = { getHomePage };