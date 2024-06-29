const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const db = require("./src/app/db/db")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000;
const routes = require("./routes");
const fileUpload = require('express-fileupload');
app.use(fileUpload());
// app.use(cors());
const server = require("http").Server(app)

app.get('/', function (req, res) {
    return res.status(200).send("Welcome to S2S")
});

routes.map(route => {
    app.use(route.path, route.handler);
});

server.listen(port, () => {
    console.log(`Server started at  ${port}`);
});
