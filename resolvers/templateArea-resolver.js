module.exports = {
 Mutation: {
   createTemplateArea(r,a,c){
     return c.prisma.createTemplateArea({
       areaName: a.areaName,
       order: a.order
     })
   },
 },
  Query: {

  },
  TemplateArea: {
    content(r,a,c){
      return c.prisma.templateArea({
        id: r.id
      }).content()
    }
  }
}