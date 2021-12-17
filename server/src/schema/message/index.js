const MESSAGES = []
let id = 0
export const MessageResolvers = {
  Query: {
    messages: async (_, args) => {
      return MESSAGES;
    }
  },
  Mutation: {
    addMessage: async (root, args, context) => {
      const { uri } = args;
      MESSAGES.push({ id: id, uri})
      id++
      return {
        id,
        uri
      }
    }
  }
};
