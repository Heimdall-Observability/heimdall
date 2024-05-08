'use server'
import { auth } from '@/auth'
import { db } from '@heimdall-logs/db'

export const getTeams = async () => {
  const session = await auth()
  const user = session?.user
  if (!user) {
    throw new Error('User not found')
  }
  return await db.query.teamMember
    .findMany({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.userId, user.id),
          operators.eq(fields.accepted, true),
        )
      },
      with: {
        team: {
          with: {
            teamMembers: {
              with: {
                users: true,
              },
            },
            teamWebsites: {
              with: {
                website: true,
              },
            },
          },
        },
      },
    })
    .then((res) =>
      res.map((teamProps) => {
        if (!teamProps.team) {
          return null
        }
        const { teamWebsites, teamMembers, ...rest } = teamProps.team
        return {
          ...rest,
          websites: teamWebsites ?? [],
          teamMember:
            teamMembers.map((t) => ({
              ...t,
              name: t.users.name,
              email: t.users.email,
            })) ?? [],
        }
      }),
    )
}
export type Teams = Awaited<ReturnType<typeof getTeams>>
