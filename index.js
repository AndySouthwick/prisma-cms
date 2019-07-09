const {GraphQLServer} = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')
const {importSchema} = require('graphql-import')
const bodyParser = require('body-parser')
const request = require('request');
const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp');
const fileUpload = require('express-fileupload');
const express = require('express')
const fileUploadServer = require('./utils/express-server')

  main = async () => {
  const cName = await prisma.contents().contentTypeName();
    const d = new Date()
    console.log(d.getMonth(),d.getDate(), d.getFullYear())
  }
setInterval(() => {
  main()
}, 43200000)


const server = new GraphQLServer({
  fileUploadServer,
  typeDefs: importSchema('schema.graphql'),
  resolvers,
  context: {
    prisma,
  },

})




server.use(bodyParser.json())
server.express.use(express.static('public'));

server.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}));

 applySmartCrop = (src, dest, width, height) => {
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
};

server.post('/images', async (req, res) =>  {
  let fileIt =  req.files.fileName
  fileIt.mv(`public/images/${fileIt.name}`)
  const src = await `http://localhost:4000/images/${fileIt.name}`;
  const lastSlash = src.lastIndexOf('/')
  const fileName = src.substr(lastSlash + 1)
  await applySmartCrop(src, `public/images/1110x686/${fileName}`, 1110, 686);
  await applySmartCrop(src, `public/images/100x100/${fileName}`, 100, 100);
  await applySmartCrop(src, `public/images/320x192/${fileName}`, 320, 192);
  await applySmartCrop(src, `public/images/1440x1024/${fileName}`, 1440, 1024);
  await applySmartCrop(src, `public/images/150x150/${fileName}`, 150, 150);
  res.sendStatus(200)
})


server.start(() => console.log('prisma is running on http://localhost:4000'))
