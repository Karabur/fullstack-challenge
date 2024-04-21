import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

export async function seed() {
  const patients = faker.helpers.uniqueArray(faker.person.fullName, 10)
  await prisma.medicalHistory.createMany({
    data: patients.map((name) => ({
      patient: name,
      allergies: faker.helpers.uniqueArray(faker.animal.type, faker.number.int(5)),
      condition: faker.person.jobTitle(),
      surgeries: faker.helpers.uniqueArray(faker.word.noun, faker.number.int(5)),
    })),
  })

  await prisma.user.create({
    data: {
      email: 'test@user.me',
      name: 'Test User',
      password: await argon2.hash('password', { type: argon2.argon2id }),
    },
  })

  console.log('Seed complete')
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
