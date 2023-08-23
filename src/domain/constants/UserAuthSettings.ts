export const UserAuthSettings = {
  maxLoginAttempts: 5,
  passwordMinLength: 8,
  defaultAvatarUrl: '/path/to/default/avatar.png',
  maxProfileNameLength: 50,
  oauthProviders: ['google', 'facebook', 'twitter'],
  jwtExpirationTime: '1h',
  refreshTokenExpirationTime: '7d',
  maxConcurrentSessions: 3,
  minPasswordComplexityScore: 3,
};
