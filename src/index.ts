import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { assignmentResolver } from './resolvers/assignmentResolver';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import path from 'path';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'schema'), { extensions: ['graphql'] }));

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        ...assignmentResolver,
    },
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`le zafair lé en orbite au:${url}`);