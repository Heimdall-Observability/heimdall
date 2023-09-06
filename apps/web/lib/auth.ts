import { env } from '@/env.mjs';
import { db } from '@/lib/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { schema } from '@heimdall-logs/db';
import { NextAuthOptions } from 'next-auth';
import { AdapterAccount } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	adapter: {
		...(DrizzleAdapter(db) as any),
		async linkAccount(rawAccount) {
			const updatedAccount = await db
				.insert(schema.accounts)
				.values(rawAccount)
				.returning()
				.get()
				.catch(async (e) => {
					const res = await db.query.accounts.findFirst({
						where(fields, operators) {
							return operators.and(
								operators.eq(fields.userId, rawAccount.userId),
								operators.eq(
									fields.providerAccountId,
									rawAccount.providerAccountId
								)
							);
						},
					});
					if (!res) {
						console.log(e);
						throw Error(e);
					}
					return res;
				});
			const account: AdapterAccount = {
				...updatedAccount,
				type: updatedAccount.type,
				access_token: updatedAccount.access_token ?? undefined,
				token_type: updatedAccount.token_type ?? undefined,
				id_token: updatedAccount.id_token ?? undefined,
				refresh_token: updatedAccount.refresh_token ?? undefined,
				scope: updatedAccount.scope ?? undefined,
				expires_at: updatedAccount.expires_at ?? undefined,
				session_state: updatedAccount.session_state ?? undefined,
			};
			return account;
		},
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60,
	},
	secret: env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/dashboard',
	},
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: env.GOOGLE_CLIENT_SECRET ?? '',
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}
			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await db.query.users.findFirst({
				where(fields, operators) {
					return operators.eq(fields.email, token.email as string);
				},
			});
			if (!dbUser) {
				if (user) {
					token.id = user?.id;
				}
				return token;
			}
			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			};
		},
	},
};
