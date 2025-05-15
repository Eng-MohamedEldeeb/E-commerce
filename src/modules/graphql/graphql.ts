import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export const graphQL = () => {
  return GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    graphiql: true,
    autoSchemaFile: join(process.cwd(), 'src/modules/graphql/schema.gql'),
  });
};
