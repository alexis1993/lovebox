import { merge } from 'lodash-es'
import { gql } from 'apollo-server';
import { UserResolvers } from './user';
import { EmailAddressResolver } from 'graphql-scalars';
import UserType from './user/type.gql';
import MessageType from './message/type.gql';
import { MessageResolvers } from './message';

const Types = gql`
  scalar EmailAddress
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;
export const typeDefs = [Types, gql`${UserType}`,gql`${MessageType}` ];
export const resolvers = MessageResolvers;
