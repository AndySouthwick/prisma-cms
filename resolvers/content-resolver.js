module.exports = {
  Mutation: {
    addContentToTemplateArea(r,a,c){
      return c.prisma.createContent({
        contentTypeName: a.contentTypeName,
        templateArea: {
          connect: {id: a.areaId}
        }
        })
    },

    addContentToArea(r, a, c){
      return c.prisma.createContent({
        contentTypeName: a.contentTypeName,
        contentArea: {
          connect: {id: a.areaId}
        }
      })
    },
    addTextToContent(r,a,c){
      return c.prisma.createText({
        content: {
          connect: {id: a.contentId}
        },
        inputTypeName: a.inputTypeName,
        inputTypeValue: a.inputTypeValue,
      })
    },
    addRichTextToContent(r,a,c){
      return c.prisma.createRichText({
        content: {
          connect: {id: a.contentId}
        },
        inputTypeName: a.inputTypeName,
        inputTypeValue: a.inputTypeValue,
      })
    },
    updateText(r,a,c){
      return c.prisma.updateText({
        where: { id: a.id },
        data: { inputTypeName: a.inputTypeName, inputTypeValue: a.inputTypeValue },
      })
    },
    updateRichText(r,a,c){
      return c.prisma.updateRichText({
        where: { id: a.id },
        data: { inputTypeName: a.inputTypeName, inputTypeValue: a.inputTypeValue },
      })
    },
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
    templateArea(r, a, c){
      return c.prisma.content()
    },
    contentArea(r, a, c){
      return c.prisma.content()
    },
    texts(r,a,c){
      return c.prisma.content({
        id: r.id
      }).texts()
    },
    richTexts(r,a,c){
      return c.prisma.content({
        id: r.id
      }).richTexts()
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
  },
  RichText: {
    content(r,a,c){
      return c.prisma.richTexts({
        id: r.id
      }).content()
    }
  }
}