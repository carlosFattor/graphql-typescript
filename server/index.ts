import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import * as Express from 'express';
import { buildSchema, Resolver, Query } from 'type-graphql';
import {DataBase} from '../db';

const dataBase = new DataBase();

const main = async () => {
  const schema = await buildSchema({
    resolvers: []
  });

  const apolloServer = new ApolloServer({ schema });
  const app = Express();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, async () => {
    const dataBaseStarted = await dataBase.connect();
    if(dataBaseStarted) {
      console.log('Data base UP');
      console.log('server started on http://localhost:4000/graphql');
    }
  })
}

main();