const { gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer, schema } = require('../server');

const server = new ApolloServer({ ...schema });
const GET_MESSAGES = gql`query {
  messages {
    uri
  }
}`
const ADD_MESSAGES = gql`mutation AddMessage($uri: String!) {
  addMessage(uri: $uri) {
    uri
  }
}`
describe('Test messages', () => {
  it('Add Messages', async () => {
    const { query } = createTestClient(server);
    const messagesBeforeAdd = await query({ query: GET_MESSAGES });
    await query({mutation:ADD_MESSAGES,'variables' : {
      'uri': "test"
    }})
    const messagesAfterAdd = await query({ query: GET_MESSAGES });
    expect(messagesAfterAdd.data.messages.length - messagesBeforeAdd.data.messages.length).toEqual(1);
  });
});
