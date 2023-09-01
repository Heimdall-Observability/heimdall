import { Team, TeamMember, User } from '@heimdall/types/models';

export type TeamWithUsers = Team & {
	TeamUser: (TeamMember & {
		User: User;
	})[];
};
