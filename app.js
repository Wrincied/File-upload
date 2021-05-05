const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const mime = require('mime-types');
const port = 3000;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '.' + mime.extension(file.mimetype) )
    }
});

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send-form', upload.array('files', 10), (req, res) => {
    console.log('-----', req.body.desc );
//   console.log('---- ', req.files );
    res.send('OK');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})