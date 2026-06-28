interface IEnv {
  app: {
    PORT: number;
    nodeEnv: string;
    frontend: string;
    DEFAULT_USER_PASSWORD: string
  };
  db: {
    URL_DB: string;
  };
  token: {
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRATION: number;
    ACCESS_EXPIRATION: number;
  };
}

const env: IEnv = {
  app: {
    PORT: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV!,
    frontend: process.env.FRONT_END!,
    DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD!,
  },
  db: {
    URL_DB: process.env.DATABASE_URL!,
  },
  token: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    REFRESH_EXPIRATION: Number(process.env.JWT_REFRESH_EXPIRATION),
    ACCESS_EXPIRATION: Number(process.env.JWT_ACCESS_EXPIRATION),
  }
};

export default env;
