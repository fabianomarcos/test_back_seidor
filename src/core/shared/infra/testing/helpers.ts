import { PrismaClient } from '../db/prisma/generated/prisma'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: 'file:./db/database_TESTS.sqlite',
})

let prisma: PrismaClient

export function setupPrisma() {
  beforeAll(async () => {
    prisma = new PrismaClient({ adapter })
    await prisma.$connect()
  })

  beforeEach(async () => {
    const tableNames = Object.keys(prisma).filter(
      (key) => typeof (prisma as any)[key]?.deleteMany === 'function',
    )

    for (const table of tableNames) {
      await (prisma as any)[table].deleteMany({})
    }
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  return {
    get prisma() {
      return prisma
    },
  }
}
