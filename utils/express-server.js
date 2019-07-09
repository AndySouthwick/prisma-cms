const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(express.static('public'));
const request = require('request');
const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp');
const fileUpload = require('express-fileupload');
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
imageUploadService = () => {
  app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
  }));

  function applySmartCrop(src, dest, width, height) {
    request(src, { encoding: null }, function process(error, response, body) {
      if (error) return console.error(error);
      smartcrop.crop(body, { width: width, height: height }).then(function(result) {
        const crop = result.topCrop;
        sharp(body)
          .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
          .resize(width, height)
          .toFile(dest);
      });
    });
  }

  app.post('/', async (req, res) =>  {
    let fileIt =  req.files.fileName
      fileIt.mv(`public/images/${fileIt.name}`)
    const src = await `http://localhost:4001/images/${fileIt.name}`;
    const lastSlash = src.lastIndexOf('/')
    const fileName = src.substr(lastSlash + 1)
    await applySmartCrop(src, `public/images/720x450/${fileName}`, 720, 450);
    await applySmartCrop(src, `public/images/100x100/${fileName}`, 100, 100);
    await applySmartCrop(src, `public/images/320x192/${fileName}`, 320, 192);
    await applySmartCrop(src, `public/images/1440x1024/${fileName}`, 1440, 1024);
    await applySmartCrop(src, `public/images/150x150/${fileName}`, 150, 150);
    res.sendStatus(200)
  })
  app.listen(4001, () => console.log('express running on http://localhost:4001'))
}

module.exports = imageUploadService()