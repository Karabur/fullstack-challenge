const getConfig = () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  auth: {
    jwtSecret: process.env.JWT_SECRET as string,
    jwtExpiresIn: '7d',
    jwtCookieName: 'test-jwt',
  },
})

export type Configuration = ReturnType<typeof getConfig>

export default getConfig
