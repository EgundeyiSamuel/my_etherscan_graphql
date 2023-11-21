const { ApolloServer } = require("apollo-server"); // import ApolloServer from apollo-server
const { importSchema } = require("graphql-import"); // import schema using graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // import custom EtherDataSource

const typeDefs = importSchema("./schema.graphql"); // import schema from file

require("dotenv").config(); // load environment variables

const resolvers = {
  Query: {
    // resolver functions to handle queries
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,

  // Configure data sources
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }),
});

// Disable response timeout
server.timeout = 0;

// Start server
server.listen("9000").then(({ url }) => {

  console.log(`🚀 Server ready at ${url}`);
});
