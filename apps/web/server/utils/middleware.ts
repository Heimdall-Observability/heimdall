import { auth } from '@/auth'
import { db } from '@heimdall-logs/db'
import { ROLE } from '@heimdall-logs/types/models'
import { inArray } from 'drizzle-orm'
import { User } from 'next-auth'

export const protectedAction = async <T>(
  fn: (user: User) => Promise<T>,
  withRole?: { role: ROLE[]; teamId: string },
) => {
  const session = await auth()
  const user = session?.user
  if (!user) {
    return null
  } else {
    if (withRole) {
      const teamUser = await checkRole(user, withRole.teamId, withRole.role)
      if (!teamUser) {
        return null
      }
    }
    return await fn(user)
  }
}

export const checkRole = async (user: User, teamId: string, role: ROLE[]) => {
  return await db.query.teamMember.findFirst({
    where(fields, operators) {
      return operators.and(
        operators.eq(fields.userId, user.id),
        operators.eq(fields.teamId, teamId),
        inArray(fields.role, role),
      )
    },
  })
}
