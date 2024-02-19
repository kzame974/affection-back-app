import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const assignmentResolver = {
    Query: {
        allAssignments: async () => {
            return prisma.assignment.findMany();
        },
    },
    Mutation: {
        createAssignment: async (_: any, args: { task: string; startDate: Date; endDate: Date }) => {
            return prisma.assignment.create({
                data: {
                    task: args.task,
                    startDate: new Date(args.startDate),
                    endDate: args.endDate ? new Date(args.endDate) : null,
                    // requiredSkills: { connect: ... } // Add skills connection if necessary
                },
            });
        },
        updateAssignment: async (_: any, args: { id: string; task?: string; startDate?: Date; endDate?: Date }) => {
            return prisma.assignment.update({
                where: {id: args.id},
                data: {
                    task: args.task,
                    startDate: args.startDate ? new Date(args.startDate) : undefined,
                    endDate: args.endDate ? new Date(args.endDate) : undefined,
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