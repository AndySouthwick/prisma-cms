const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const secret = require("../secrets")
module.exports = {
  Query: {
    allUsers(root, args, context){
      return context.prisma.users()
    }
  },
  Mutation: {
    createUser(root, args, context){
      const hash = bcrypt.hashSync(args.hashed, saltRounds)
      return context.prisma.createUser({
        email: args.email,
        name: args.name,
        hashed: hash
      })
    },
    updateUser(root, args, context){
      const hash = bcrypt.hashSync(args.hashed, saltRounds)
      return context.prisma.updateUser({
        where: {id: args.userId},
        data: {
          email: args.email,
          hashed: hash,
          name: args.name
        }
      })

    },
    async loginUser(root, args, context) {
      console.log(args)
      bcrypt.hash(args.hashed, saltRounds, (err, hash) => {
        console.log('hash', hash)
      })
      console.log(args.email)
      const getUser = await context.prisma.user({email: args.email})
      console.log(getUser)
      console.log('getUser hased', getUser.hashed)
      const hashCheck = bcrypt.compareSync(args.hashed, getUser.hashed);
      if (hashCheck) {
        return {
          token: jwt.sign({
              exp: Math.floor(Date.now() / 1000) + (60 * 24),
              claims: true
            },
            secret,
            {
              algorithm: "HS256"
            })
        }

      }
    }
  },
  User: {
    pages(root, args, context) {
      return context.prisma
        .user({
          id: root.id,
        })
        .pages()
    },
  },
}