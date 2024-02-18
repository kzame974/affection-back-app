const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function createRandomSkillsForEmployee(employeeId) {
    const allSkills = await prisma.skill.findMany();
    const skillsPromises = allSkills.map(skill => {
        const randomLevel = Math.floor(Math.random() * 10) + 1;
        return prisma.skillLevel.create({
            data: {
                level: randomLevel,
                employeeId: employeeId,
                skillId: skill.id,
            },
        });
    });
    return Promise.all(skillsPromises);
}

async function createRandomEmployees(number) {
    for (let i = 0; i < number; i++) {
        const employee = await prisma.employee.create({
            data: {
                name: faker.person.fullName(),
            },
        });
        await createRandomSkillsForEmployee(employee.id);
        console.log(`Employee ${employee.name} created with skills.`);
    }
}

async function main() {
    console.log('Starting data generation...');
    try {
        await createRandomEmployees(25);
        console.log('Data generation completed.');
    } catch (e) {
        console.error('Error during data generation:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();