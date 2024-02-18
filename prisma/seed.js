import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createRandomSkills(number) {
    let skills = [];
    for (let i = 0; i < number; i++) {
        const skill = await prisma.skill.create({
            data: {
                name: faker.random.word(),
                level: faker.datatype.number({ min: 1, max: 10 }),
            },
        });
        skills.push(skill);
    }
    return skills;
}

async function createRandomEmployees(number) {
    for (let i = 0; i < number; i++) {
        const employee = await prisma.employee.create({
            data: {
                name: faker.name.findName(),
                skills: {
                    create: await createRandomSkills(faker.datatype.number({ min: 1, max: 5 })),
                },
            },
        });
        await createRandomAvailabilities(employee.id, 10); // Assuming you want 10 availabilities per employee
        await createRandomPerformanceReviews(employee.id, 5); // Assuming you want 5 reviews per employee
    }
}

async function createRandomAvailabilities(employeeId, number) {
    for (let i = 0; i < number; i++) {
        await prisma.availability.create({
            data: {
                date: faker.date.future(),
                employeeId,
            },
        });
    }
}

async function createRandomPerformanceReviews(employeeId, number) {
    for (let i = 0; i < number; i++) {
        await prisma.performanceReview.create({
            data: {
                date: faker.date.past(),
                comments: faker.lorem.sentence(),
                rating: faker.datatype.number({ min: 1, max: 5 }),
                employeeId,
            },
        });
    }
}

async function main() {
    await createRandomEmployees(50); // Create 50 employees as an example
}


main()

    .then(async () => {

        await prisma.$disconnect()

    })

    .catch(async (e) => {

        console.error(e)

        await prisma.$disconnect()

        process.exit(1)

    })
