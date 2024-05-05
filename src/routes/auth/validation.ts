import * as v from "valibot";

export const Credentials = v.object({
  email: v.string([v.email()]),
  password: v.string([v.minLength(8)]),
});

export type CredentialsOutput = v.Output<typeof Credentials>;
export type CredentialsInput = v.Input<typeof Credentials>;

export const Token = v.object({
  refresh_token: v.string(),
});

export type TokensOutput = v.Output<typeof Token>;
export type TokensInput = v.Input<typeof Token>;
