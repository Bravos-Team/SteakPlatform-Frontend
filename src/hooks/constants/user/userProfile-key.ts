export const USER_AUTH_QUERY_KEY = {
  EMAIL: ['user', 'auth', 'login', 'email'] as const,
  USERNAME: ['user', 'auth', 'login', 'username'] as const,
  RENEW_REFRESH_TOKEN: ['user', 'auth', 'renew-refresh-token'] as const,
}
export const USER_PROFILE_QUERY_KEY = {
  PROFILE: ['user', 'profile'] as const,
}
