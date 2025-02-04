const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const db = require("./src/app/db/db")
app.use(express.json())
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '150mb'
}));
const multer = require('multer');

const port = process.env.PORT || 3000;
const routes = require("./routes");
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const fileUpload = async (req, res) => {
    try {
        let uploadedFile = req.file;
        let urlPath = `/uploads/${uploadedFile.filename}`;

        console.log("File URL Path:", urlPath);

        return res.send({ url: urlPath });
    } catch (error) {
        console.error("Error uploading file:", error);
        return res.status(500).json({ error: "Error uploading file" });
    }
};
app.post('/upload', upload.single('image'), fileUpload);


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
