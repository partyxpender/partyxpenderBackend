const express = require("express");
const app = express();
require('dotenv').config();
const { dbConfig } = require('./db/db');
const bodyParser = require('body-parser');
const port = process.env.MYSQL_ADDON_PORT;
const userRoute = require('./routes/user.route');
const { Server } = require("socket.io");

const { createServer } = require("node:http");
const { xpend, addUser } = require("./controllers/user");
const server = createServer(app);
const io = new Server(server);
//db authentication
dbConfig.authenticate().then(async (_) => {
    await dbConfig.sync();
    console.log("DB authentication successful");
}).catch((err) => {
    console.log(err);
    dbConfig.authenticate().then((_) => {
        console.log("DB authentication successful");
    }).catch((err) => {
        dbConfig.authenticate().then((_) => {
            console.log("DB authentication successful");
        }).catch((err) => {
            console.log(err);
        });
        console.log(err);
    });
});

//middleware
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 100000 }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Content-type:application/json");
    next();
});
app.get('/', (req, res) => res.send("Hello, world!\n\nWelcome to partie - xpender"));
app.get('/download_apk', (req, res) => res.sendFile(__dirname+'/partixpender.apk'));
app.use("/api/v0/users", userRoute);




io.on("connection", (socket) => {
    // console.log(socket.handshake.url);
    console.log("someone connected");
    socket.on('xpending', (info) => {
        console.log(info);
        xpend(info.xpender, info.receiver, info.amount);
        socket.broadcast.emit("receiving", { receiver: info.receiver, amount: info.amount, xpender: info.xpender });
    });
    socket.on('add_user', (info) => {
        console.log(info);
        addUser(info.xuid, info.ruid);
    });
})

server.listen(port, () => {
    console.log(`PartieXpender is listening on ${port}`);
});