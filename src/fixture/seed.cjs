const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

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

async function createRandomSkillsForAssignment(number) {
    const skillsPromises = [];
    for (let i = 0; i < number; i++) {
        const skillName = faker.helpers.arrayElement(skills);
        skillsPromises.push(prisma.skill.create({
            data: {
                name: skillName,
            },
        }));
    }
    return Promise.all(skillsPromises);
}

async function createRandomAssignments(number) {
    const assignmentPromises = [];
    for (let i = 0; i < number; i++) {
        const assignmentSkills = await createRandomSkillsForAssignment(faker.number.int({ min: 1, max: 5 }));
        assignmentPromises.push(prisma.assignment.create({
            data: {
                task: faker.helpers.arrayElement(tasks),
                requiredSkills: {
                    connect: assignmentSkills.map(skill => ({ id: skill.id })),
                },
                startDate: faker.date.recent(),
                endDate: faker.date.future(),
            },
        }));
    }
    await Promise.all(assignmentPromises);
}

async function createRandomSkillsForEmployee(employeeId) {
    const skillsPromises = [];
    for (const skill of skills) {
        const skillLevel = faker.number.int({ min: 1, max: 10 });
        skillsPromises.push(prisma.skillLevel.create({
            data: {
                level: skillLevel,
                employee: {
                    connect: { id: employeeId },
                },
                skill: {
                    connect: { name: skill },
                },
            },
        }));
    }
    return Promise.all(skillsPromises);
}

async function createRandomEmployees(number) {
    const employeePromises = [];
    for (let i = 0; i < number; i++) {
        employeePromises.push((async () => {
            const employee = await prisma.employee.create({
                data: {
                    name: faker.person.fullName(),
                },
            });
            await createRandomSkillsForEmployee(employee.id);
            console.log(`Employee ${employee.name} created with skills.`);
        })());
    }
    await Promise.all(employeePromises);
}

async function main() {
    console.log('Starting data generation...');
    try {
        await createRandomAssignments(10);
        await createRandomEmployees(25);
        console.log('Data generation completed.');
    } catch (e) {
        console.error('Error during data generation:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();