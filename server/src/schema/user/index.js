const USERS = []
new Array(10).fill(null).map((value, index) => {
  USERS.push({ id: `${index}`, email: `user${index}@mail.com`, password: `password${index}`, joinDate: new Date(2020, index, index) });
});

export const UserResolvers = {
  Query: {
    users: async (_, args) => {
      return USERS;
    },
    user: (_, { id }) => {
      return USERS.find((user) => user.id === id);
    },
    me: (_, args, { currentUser }) => {
      return currentUser;
    }
  },
};
