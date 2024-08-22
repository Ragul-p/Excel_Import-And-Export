const express = require("express");
const app = express();

require("./db/config");
require("./model/user.model");

app.set("view engine", "ejs");


app.use("/", require("./routes/home.routes"));
app.use("/excel", require("./routes/user.routes"));


app.listen(3000, function () {
    console.log("server is listen on port 3000");
});