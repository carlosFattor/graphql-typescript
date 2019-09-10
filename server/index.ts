import { ApolloServer } from "apollo-server-express";
import connectRedis from 'connect-redis';
import cors from 'cors';
import Express from "express";
import session from 'express-session';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { MongoDB } from "../db/mongodb";
import { redis } from "../db/redis";
import { ListUserResolver } from "./modules/user/list/ListUsersResolver";
import { LoginResolver } from "./modules/user/login/Login";
import { RegisterResolver } from "./modules/user/register/Register";

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
    resolvers: [RegisterResolver, LoginResolver, ListUserResolver],
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
