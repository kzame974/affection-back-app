import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createFixtures() {
    // Créer des employés
    const employee = await prisma.employee.create({
        data: {
            name: 'John Doe',
            // Ajouter d'autres champs selon le besoin
        },
    });

    // Créer des compétences
    const skill = await prisma.skill.create({
        data: {
            name: 'JavaScript',
            level: 5,
            // Ajouter d'autres champs selon le besoin
        },
    });

    // Créer des disponibilités
    const availability = await prisma.availability.create({
        data: {
            date: new Date(),
            employeeId: employee.id,
        },
    });

    // Créer des revues de performance
    const review = await prisma.performanceReview.create({
        data: {
            date: new Date(),
            comments: 'Excellent work!',
            rating: 5,
            employeeId: employee.id,
        },
    });

    // Créer des affectations
    const assignment = await prisma.assignment.create({
        data: {
            task: 'Develop a new feature',
            employeeId: employee.id,
            requiredSkills: {
                connect: [{ id: skill.id }],
            },
        },
    });

    console.log('Fixtures created');
}

createFixtures()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });