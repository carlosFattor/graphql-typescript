import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { MongoDB } from "../db/mongodb";
import { RegisterResolver } from "./modules/user/register/Register";
import session from 'express-session'
import connectRedis from 'connect-redis';
import { redis } from "../db/redis";
import cors from 'cors';
import { LoginResolver } from "./modules/user/login/Login";

const dataBase = new MongoDB();
const RedisStore = connectRedis(session);

const _session = session({
  store: new RedisStore({
    client: redis as any
  }),
  name: 'qid',
  secret: 'asdsaoiuçasd',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365
  }
})

const _cors = {
  credentials: true,
  origin: 'http://localhost:3000'
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver],
    authChecker: (({ context: { req } }) => {
      return !!req.session.userId
    })
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req })
  });

  const app = Express();

  app.use(cors(_cors));
  app.use(_session);
  apolloServer.applyMiddleware({ app });

  app.listen(4000, async () => {
    const dataBaseStarted = await dataBase.connect();
    if (dataBaseStarted) {
      console.log("Data base UP");
      console.log("server started on http://localhost:4000/graphql");
    }
  });
};

main();
