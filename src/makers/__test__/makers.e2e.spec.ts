import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { GraphQLModule } from '@nestjs/graphql';

import { MakersModule } from '../makers.module';

describe('Maker Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MakersModule,
        GraphQLModule.forRoot({
          installSubscriptionHandlers: true,
          autoSchemaFile: './src/schema.gql',
          debug: false,
          playground: false,
          context: ({ req }) => ({ req }),
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('When calling MUTATION', () => {
    const maker = {
      name: 'John',
      state: 'FOO',
    };

    let id = '';

    const createMakerInput = JSON.stringify(maker).replace(/\"([^(\")"]+)\":/g, '$1:');

    const createMakerQuery = `
    mutation {
      createMaker(newMakerData: ${createMakerInput}) {
        id
        name
        state
      }
    }`;

    it('createMaker: Should return a valid Maker', async () => {
      const result = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          operationName: null,
          query: createMakerQuery,
        })
        .expect(({ body }) => {
          const data = body.data.createMaker;
          id = data.id;
          expect(data.name).toBe(maker.name);
          expect(data.state).toBe(maker.state);
        })
        .expect(200);
    });
  });
});
