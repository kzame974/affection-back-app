import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const assignmentResolver = {
    Query: {
        allAssignments: async () => {
            return prisma.assignment.findMany();
        },
    },
    Mutation: {
        createAssignment: async (_: any, args: { task: string; startDate: String; endDate: String }) => {
            return prisma.assignment.create({
                data: {
                    task: args.task,
                    // requiredSkills: { connect: ... } // Add skills connection if necessary
                },
            });
        },
        updateAssignment: async (_: any, args: { id: string; task?: string; startDate?: String; endDate?: String }) => {
            return prisma.assignment.update({
                where: {id: args.id},
                data: {
                    task: args.task,
                },
            });
        },
        deleteAssignment: async (_: any, args: { id: string }) => {
            return prisma.assignment.delete({
                where: {id: args.id},
            });
        },
    },
};