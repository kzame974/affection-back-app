import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from "./schema/typeDefs";
import {prisma} from "./prisma/client";
import {resolvers} from "./resolvers";

interface ContextValue {
    prisma: typeof prisma;
    token?: string;
}

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
});

async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        context: async ({ req }) => {
            const token = req.headers.token as string;
            return {
                prisma,
                token,
            };
        },
    });

    console.log(`le zafaire lé rédi: ${url}`);
}

startServer().catch(error => console.error('Failed to start the server', error));