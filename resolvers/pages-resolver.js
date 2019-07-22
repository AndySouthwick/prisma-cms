
module.exports = {
  Query: {
    page(root, args, context){
      return context.prisma.page({
        id: args.pageId,
        title: args.pageName
      })
    },
    allPages(r, a, c){
      return c.prisma.pages()
    },
  },
  Mutation: {
    createDraft(root, args, context) {
      const title = args.title.replace(/\s+/g, '-').toLowerCase();
      console.log(title)
      // console.log(args)
      return context.prisma.createPage({
        title: title,
        user: {
          connect: { id: args.userId },
        },
      })
    },
    publish(root, args, context) {
      return context.prisma.updatePage({
        where: { id: args.pageId },
        data: { published: true },
      })
    },
  },
  Page: {
    user(root, args, context) {
      console.log('from user in page', root.id)
      return context.prisma.page({
        id: root.id,
      }).user()
    },
    contentAreas(root, args, context){
      console.log('this ran')
      return context.prisma.page({
        id: root.id,
      }).contentAreas()
    }
  }
}