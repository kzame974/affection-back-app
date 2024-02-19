// npm install @apollo/server graphql
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface MyContext {
    token?: String;
}

const typeDefs = `#graphql
type Employee {
    id: ID!
    name: String!
    skills: [Skill!]!
    availabilities: [Availability!]!
    assignments: [Assignment!]!
}

type Skill {
    id: ID!
    name: String!
    employees: [Employee!]!
    assignments: [Assignment!]!
}

type SkillLevel {
    id: ID!
    level: Int!
    employee: Employee!
    skill: Skill!
}

type Assignment {
    id: ID!
    task: String!
    requiredSkills: [Skill!]!
    assignedTo: [Employee!]!
    startDate: String!
    endDate: String
}

type Availability {
    id: ID!
    date: String!
    employee: Employee!
}

type Query {
    employees: [Employee!]!
    skills: [Skill!]!
    assignments: [Assignment!]!
    availabilities: [Availability!]!
}
`;
export const resolvers = {
    Query: {
        employees: async () => {
            return prisma.employee.findMany();
        },
        skills: async () => {
            return prisma.skill.findMany();
        },
        assignments: async () => {
            return prisma.assignment.findMany();
        },
        availabilities: async () => {
            return prisma.availability.findMany();
        },
    },
    Employee: {
        skills: (parent: { id: any; }) => {
            return prisma.employee.findUnique({ where: { id: parent.id } }).skills();
        },

    },
};

const server = new ApolloServer<MyContext>({
    typeDefs, resolvers
});
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
});
console.log(`🚀  le zafai lé en orbite ${url}`);