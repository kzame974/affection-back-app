import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Adjust the interface to expect string types for dates, matching GraphQL input types
interface AssignmentArgs {
    id?: string;
    task?: string;
    startDate?: string;
    endDate?: string;
}

const assignmentResolver = {
    Query: {
        allAssignments: async () => {
            return prisma.assignment.findMany();
        },
    },
    Mutation: {
        createAssignment: async (_: any, args: AssignmentArgs) => {
            const { task, startDate, endDate } = args;

            return prisma.assignment.create({
                data: {
                    task,
                    // @ts-ignore
                    startDate: startDate ? new Date(startDate) : undefined, // Convert string to Date
                    endDate: endDate ? new Date(endDate) : undefined, // Convert string to Date or leave as undefined
                },
            });
        },
        updateAssignment: async (_: any, args: AssignmentArgs) => {
            const { id, task, startDate, endDate } = args;
            return prisma.assignment.update({
                where: { id: id! },
                data: {
                    ...(task && { task }),
                    ...(startDate && { startDate: new Date(startDate) }), // Ensure startDate is properly converted
                    ...(endDate && { endDate: endDate ? new Date(endDate) : undefined }), // Convert endDate or set to undefined
                },
            });
        },
        deleteAssignment: async (_: any, args: { id: string }) => {
            const { id } = args;
            return prisma.assignment.delete({
                where: { id },
            });
        },
    },
};

export default assignmentResolver;
