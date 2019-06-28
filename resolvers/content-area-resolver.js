module.exports = {
  Mutation:  {
    createContentArea(r,a,c){
      console.log(a)
      return c.prisma.createContentArea({
        page: {
          connect: {id: a.pageId}
        },
        areaName: a.areaName,
        order: a.order
      })
    },
    updateContentArea(r,a,c){
      return c.prisma.updateContentArea({
        where: {id: a.areaId},
        data: {
          order: a.order,
          areaName: a.areaName
          }
      })
    }
  },
  Query: {
    contentAreas(r,a,c){
      return c.prisma.contentAreas()
    },

    contentAreasOnPage(r,a,c){
      console.log(a)
    return c.prisma.page({
      id: a.pageId,
    }).contentAreas({
      orderBy: a.orderBy
    })
    }
  },
  ContentArea: {
    page(r, a, c){
      return c.prisma.contentAreas({
        id: r.id
      }).page()
    },
    content(r,a,c){
      return c.prisma.contentArea({
        id: r.id
      }).content()
    }
  }
}