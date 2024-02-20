import { prisma } from '../prisma/client';

export const Query = {
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
    recommendEmployeesForAssignment: async (_, { assignmentId }) => {
        return [];
    },
};