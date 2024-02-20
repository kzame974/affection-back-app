
export const typeDefs = `#graphql
type Employee {
    id: ID!
    name: String!
    skills: [Skill!]!
    availabilities: [Availability!]!
    assignments: [Assignment!]!
}

type Skill {
    id: ID!
    name: String!
    employees: [Employee!]!
    assignments: [Assignment!]!
}

type SkillLevel {
    id: ID!
    level: Int!
    employee: Employee!
    skill: Skill!
}

type Assignment {
    id: ID!
    task: String!
    requiredSkills: [Skill!]!
    assignedTo: [Employee!]!
    startDate: String!
    endDate: String
}

type Availability {
    id: ID!
    date: String!
    employee: Employee!
}

type Query {
    employees: [Employee!]!
    skills: [Skill!]!
    assignments: [Assignment!]!
    availabilities: [Availability!]!
    recommendEmployeesForAssignment(assignmentId: ID!): [Employee!]!
}
`;