const { PrismaClient } = require('@prisma/client');
const {faker} = require("@faker-js/faker");
const prisma = new PrismaClient();

const skills = [
    "JavaScript",
    "Python",
    "Data Analysis",
    "Project Management",
    "UI/UX Design",
    "Machine Learning",
    "SQL",
    "Docker",
    "Kubernetes",
    "React",
    "Node.js",
    "Agile Methodologies",
];

const tasks = [
    "Création de site vitrine",
    "Création d'un SaaS",
    "Refacto de code",
    "Migration d'une stack",
    "Changement de design du front",
    "Optimisation des performances d'une application",
    "Ajout de fonctionnalités de paiement en ligne",
    "Mise en place d'un système de notifications en temps réel",
    "Développement d'une application mobile",
    "Intégration d'un système de gestion des utilisateurs",
    "Déploiement d'une application sur le cloud",
    "Mise en place d'un système de sauvegarde automatique",
    "Développement d'un chatbot pour le support client",
    "Migration vers une architecture microservices",
    "Intégration d'un système de gestion de contenu (CMS)",
    "Configuration d'un serveur de messagerie électronique",
    "Développement d'une API REST pour une application web",
    "Création d'un tableau de bord pour visualiser les données",
    "Optimisation du référencement (SEO) d'un site web",
    "Mise en place d'un système de surveillance et de logging",
];
async function createSkills() {
    for (const skillName of skills) {
        await prisma.skill.create({
            data: {
                name: skillName,
            },
        });
    }
}

async function createAssignments() {
    const allSkills = await prisma.skill.findMany();
    for (const task of tasks) {
        const randomSkillsSubset = faker.helpers.arrayElements(allSkills, faker.number.int({ min: 1, max: 5 }));
        await prisma.assignment.create({
            data: {
                task: task,
                requiredSkills: {
                    connect: randomSkillsSubset.map(skill => ({ id: skill.id })),
                },
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
            },
        });
    }
}


async function main() {
    console.log('Starting data generation...');
    try {
        await createSkills();
        await createAssignments();
        console.log('Data generation completed.');
    } catch (e) {
        console.error('Error during data generation:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
