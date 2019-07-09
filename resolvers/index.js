const ContentTypeResolver = require('./content-type-resolver')
const ContentResolver = require('./content-resolver')
const PagesResolver = require('./pages-resolver')
const ContentAreaResolver = require('./content-area-resolver')
const UserResolver = require('./user-resolver')
const ImageResolver = require('./image-resolver')
module.exports = [
  ContentTypeResolver,
  ContentResolver,
  PagesResolver,
  ContentAreaResolver,
  UserResolver,
  ImageResolver
]
