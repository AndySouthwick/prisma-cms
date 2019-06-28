

module.exports = {
  Mutation: {
    addContentToArea(r, a, c){
      return c.prisma.createContent({
        contentTypeName: a.contentTypeName,
        contentArea: {
          connect: {id: a.areaId}
        }
      })
    },
    addContentToPage(r, a, c){
      return c.prisma.createContent({
        contentTypeName: a.contentTypeName,
        page: {
          connect: {id: a.pageId}
        }
      })
    },
    addTextToContent(r,a,c){
      return c.prisma.createText({
        content: {
          connect: {id: a.contentId}
        },
        inputTypeName: a.inputTypeName,
        inputTypeValue: a.inputTypeValue
      })
    }
  },
  Query: {
    content(r,a,c){
      return c.prisma.content({
        id: a.id
      })
    },
    allContent(r,a,c){
      return c.prisma.content()
    }
  },
  Content: {
    contentArea(r, a, c){
      return c.prisma.content()
    },
    texts(r,a,c){
      return c.prisma.content({
        id: r.id
      }).texts()
    },
    page(r,a,c){
      return c.prisma.content({
        id: r.id
      })
    }
  },
  Text: {
    content(r,a,c){
      return c.prisma.texts({
        id: r.id
      }).content()
    }
  }
}