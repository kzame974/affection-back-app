/*
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
async function findBestMatchForTask(taskId) {
    // Utilisez Prisma Client pour récupérer la tâche et ses compétences requises
    const task = await prisma.assignment.findUnique({
        where: { id: taskId },
        include: { requiredSkills: true },
    });

    // Récupérez les employés disponibles avec au moins une des compétences requises
    const availableEmployees = await prisma.employee.findMany({
        where: {
            skills: {
                some: {
                    id: { in: task.requiredSkills.map(skill => skill.id) }
                }
            },
            // Ajoutez d'autres conditions de disponibilité si nécessaire
        },
        include: {
            skills: true,
            performanceReviews: true,
            // Incluez d'autres informations pertinentes
        }
    });

    // Calculez les scores pour chaque employé
    const scoredEmployees = availableEmployees.map(employee => ({
        ...employee,
        score: calculateScore(employee, task.requiredSkills),
    }));

    // Triez les employés par score décroissant
    scoredEmployees.sort((a, b) => b.score - a.score);

    // Retournez l'employé le mieux noté
    return scoredEmployees[0];
}

function calculateScore(employee, requiredSkills) {
    // Implémentez votre logique de scoring ici, en utilisant employee et requiredSkills
    let score = 0;
    // ...
    return score;
}
*/