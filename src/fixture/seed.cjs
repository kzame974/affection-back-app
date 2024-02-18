const { PrismaClient } = require('@prisma/client')
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

async function createRandomSkills(number) {
    let skillsPromises = [];
    for (let i = 0; i < number; i++) {
        const skillName = faker.helpers.arrayElement(skills);
        skillsPromises.push(prisma.skill.create({
            data: {
                name: skillName,
                level: faker.number.int({ min: 1, max: 10 }),
            },
        }));
    }
    return Promise.all(skillsPromises);
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
    await Promise.all(availabilitiesPromises);
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

async function createRandomEmployees(number) {
    const employeePromises = [];
    for (let i = 0; i < number; i++) {
        employeePromises.push((async () => {
            const skills = await createRandomSkills(faker.number.int({ min: 1, max: 5 }));
            const employee = await prisma.employee.create({
                data: {
                    name: faker.person.fullName(),
                    skills: {
                        create: skills,
                    },
                },
            });
            await createRandomAvailabilities(employee.id, faker.number.int({ min: 1, max: 10 }));
            await createRandomPerformanceReviews(employee.id, faker.number.int({ min: 1, max: 5 }));
            console.log(i + 'donnée crée');
        })());
    }
    await Promise.all(employeePromises);
}

async function main() {
    console.log('Starting data generation...');
    try {
        await createRandomEmployees(50);
        console.log('Data generation completed.');
    } catch (e) {
        console.error('Error during data generation:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();