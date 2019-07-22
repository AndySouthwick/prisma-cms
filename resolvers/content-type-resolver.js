module.exports = {
  Mutation: {
    createContentType(r, a, c){
      return c.prisma.createContentType({
        typeName: a.typeName
      })
    },
    updateContentType(r, a, c){
      console.log(a)
       c.prisma.updateContentType({
        where: { id: a.id },
        data: {typeName: a.typeName,
                iterable: a.iterable}
      })

      return c.prisma.updateManyContentAreas({
        where: { areaName: a.typeName },
        data: {
          iterable: a.iterable
        }
      })
    },
    addInputTypeToContentType(r, a, c){
      return c.prisma.createInputType({
        label: a.label,
        help: a.help,
        input: a.input,
        contentType: {
          connect: {
            id: a.contentTypeId
          }
        }
      })
    },
    updateInputType(r,a,c){
      return c.prisma.updateInputType({
        where: { id: a.inputTypeId },
        data: { help: a.help,
                input: a.input,
                label: a.label}
      })
    }
  },
  Query: {
    contentType(r,a,c){
      return c.prisma.contentType({
        typeName: a.name
      })
    },
    allContentTypes(r, a, c){
      return c.prisma.contentTypes()
    },
    inputTypes(r,a,c){
      return c.prisma.inputTypes()
    },
    inputTypesOfContentType(r,a,c){
      console.log(a)
      return c.prisma.contentType({
        id: a.contentTypeId,
        typeName: a.contentTypeName
      }).inputTypes()
    }
  },
  ContentType: {
    inputTypes(r, a ,c){
      console.log(r)
      return c.prisma.contentType({
        id: r.id
      }).inputTypes()
    }
 },
 InputType: {

    contentType(r, a, c){
      console.log(r)
      return  c.prisma.inputType({
        id: r.id
      }).contentTypes()
    }
 }
}