import { PrismaClient } from '@prisma/client'
import { fieldEncryptionExtension } from 'prisma-field-encryption'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const client = globalThis.prisma ?? prismaClientSingleton()
export const prisma = client.$extends(fieldEncryptionExtension())

export * from '@prisma/client'

export type TPrismaClient = typeof prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client

// declare global {
//   var cachedPrisma: PrismaClient
// }
//
// let client: PrismaClient
// if (process.env.NODE_ENV === 'production') {
//   client = new PrismaClient()
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient()
//   }
//   client = global.cachedPrisma
// }
//
// export const prisma = client.$extends(fieldEncryptionExtension())
