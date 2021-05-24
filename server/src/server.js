require('dotenv').config();
import consola from 'consola';
import { ApolloServer } from 'apollo-server';
import * as schema from './schema';

consola.info({
  message: `Starting on ${process.env.NODE_ENV} mode`,
  badge: true,
});

const context = async ({ req, res }) => {
  return {
    res,
  };
}

const options = {
  ...schema,
  context
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(options, {
    introspection: false,
    playground: false,
  });
}

const server = new ApolloServer(options);

export {
  schema,
  ApolloServer,
  server,
  context
}
