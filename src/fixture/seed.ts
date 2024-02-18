import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

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

async function createRandomSkills(number) {
    let skillsPromises = [];
    for (let i = 0; i < number; i++) {
        const skillName = faker.helpers.arrayElement(skills);
        skillsPromises.push(prisma.skill.create({
            data: {
                name: skillName,
                level: faker.datatype.number({ min: 1, max: 10 }),
            },
        }));
    }
    return Promise.all(skillsPromises);
}
async function createRandomEmployees(number) {
    const employeePromises = [];
    for (let i = 0; i < number; i++) {
        employeePromises.push((async () => {
            const skills = await createRandomSkills(faker.number.int({ min: 1, max: 5 }));
            const employee = await prisma.employee.create({
                data: {
                    name: faker.person.fullName(),
                    skills: {
                        create: [
                            { name: "Skill 1", level: faker.number.int({ min: 1, max: 5 }) },
                        ],
                    },
                },
            });
            await createRandomAvailabilities(employee.id, 10);
            await createRandomPerformanceReviews(employee.id, 5);
        })());
    }
    await Promise.all(employeePromises); // Exécute en parallèle
}

async function createRandomAvailabilities(employeeId, number) {
    const availabilitiesPromises = [];
    for (let i = 0; i < number; i++) {
        availabilitiesPromises.push(prisma.availability.create({
            data: {
                date: faker.date.future(),
                employeeId,
            },
        }));
    }
    await Promise.all(availabilitiesPromises); // Exécute en parallèle
}

async function createRandomPerformanceReviews(employeeId, number) {
    const performanceReviewsPromises = [];
    for (let i = 0; i < number; i++) {
        performanceReviewsPromises.push(prisma.performanceReview.create({
            data: {
                date: faker.date.past(),
                comments: faker.lorem.sentence(),
                rating: faker.number.int({ min: 1, max: 5 }),
                employeeId,
            },
        }));
    }
    await Promise.all(performanceReviewsPromises);
}

async function main() {
    try {
        await createRandomEmployees(50);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();