import * as v from "valibot";

export const Credentials = v.object({
  email: v.string([v.email()]),
  password: v.string([v.minLength(8)]),
});

export type CredentialsOutput = v.Output<typeof Credentials>;
export type CredentialsInput = v.Input<typeof Credentials>;

export const Tokens = v.object({
  access_token: v.optional(v.string()),
  refresh_token: v.optional(v.string()),
});

export type TokensOutput = v.Output<typeof Tokens>;
export type TokensInput = v.Input<typeof Tokens>;
