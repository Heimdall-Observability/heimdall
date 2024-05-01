import { Team, TeamMember, User } from '@heimdall-logs/types/models'

export type TeamWithUsers = Team & {
  TeamUser: (TeamMember & {
    User: User
  })[]
}
