module.exports = {
  Mutation: {
    async createImage(root, args, context){
      console.log(args)
      const imgServerUrl = "http://localhost:4001"
      if(args.imageSizeOnly === 'Hero')
        return context.prisma.createImage({
          imageUrl: `${imgServerUrl}/images/720x450/${args.imageUrl}`,
          altText: args.altText,
          imageDimensions: '720x450',
          thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`
        })
      if(args.imageSizeOnly === 'Cover')
        return context.prisma.createImage({
          imageUrl: `${imgServerUrl}/images/1440x1024/${args.imageUrl}`,
          altText: args.altText,
          imageDimensions: '1440x1024',
          thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`

        })
      if(args.imageSizeOnly === 'Card')
        return context.prisma.createImage({
          imageUrl: `${imgServerUrl}/images/320x192/${args.imageUrl}`,
          altText: args.altText,
          imageDimensions: '320x192',
          thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`
        })
      if(args.imageSizeOnly === 'Product')
        return context.prisma.createImage({
          imageUrl: `${imgServerUrl}/images/150x150/${args.imageUrl}`,
          altText: args.altText,
          imageDimensions: '150x150',
          thumbnail:`${imgServerUrl}/images/150x150/${args.imageUrl}`
        })
      if(!args.imageSizeOnly)
        await context.prisma.createImage({
          imageUrl: `${imgServerUrl}/images/320x192/${args.imageUrl}`,
          altText: args.altText,
          imageDimensions: '320x192',
          thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`
        })
      await context.prisma.createImage({
        imageUrl: `${imgServerUrl}/images/720x450/${args.imageUrl}`,
        altText: args.altText,
        imageDimensions: '720x450',
        thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`
      })
      await context.prisma.createImage({
        imageUrl: `${imgServerUrl}/images/1440x1024/${args.imageUrl}`,
        altText: args.altText,
        imageDimensions: '1440x1024',
        thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`

      })
      await context.prisma.createImage({
        imageUrl: `${imgServerUrl}/images/150x150/${args.imageUrl}`,
        altText: args.altText,
        imageDimensions: '150x150',
        thumbnail:`${imgServerUrl}/images/100x100/${args.imageUrl}`

      })
    },

    async updateImage(root, args, context){
      return context.prisma.updateImage({
        where: {id: args.id},
        data: {
          altText: args.altText,
          imageSizeOnly: args.imageSizeOnly,
        },
      })
    },

    async addImageToMarket(root, args, context){
      return context.prisma.createMarket({
        marketCode: args.marketCode,
        images: {
          connect: {
            id: args.imageId
          }
        }
      }).image()
    }
  },

  Query: {
    async allImages(root, args, context){
      return context.prisma.images()
    },
    // async allMarkets(root, args, context){
    //   return context.prisma.markets()
    // },
    async filterImagesByMarket(root, args, context){
      return context.prisma.markets({
        where: {
          marketCode: args.orderBy
        },
      })
    },
    async filterImagesByDimensions(root, args, context){
      return context.prisma.images({
        where: {
          imageDimensions: args.filter
        }
      })
    }
  },
  Image: {
    markets(root, args, context){
      return context.prisma.image({
        id: root.id
      }).markets()
    }
  },
  Market: {
    images(root, args, context){
      return context.prisma.market({
        id: root.id
      }).images()
    }
  }
}