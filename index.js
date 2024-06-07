const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.MYSQL_ADDON_PORT;







app.listen(port, () => {
    console.log(`PartieXpender is listening on ${port}`);
});