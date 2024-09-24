import request from 'supertest';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Api Controller Item test (e2e)', () => {
  let app: INestApplication;
  let connection: DataSource;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = moduleFixture.get(DataSource);

    if (!connection.isInitialized) {
      await connection.initialize();
    }

    await connection.query('TRUNCATE TABLE item CASCADE');
  });

  afterAll(async () => {
    await connection.destroy();
    await app.close();
  });

  it('should get a response with status code 200', async () => {
    await request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect({ ok: true });
  });

  describe('Basic Items functionality', () => {
    it('should be able to list all items', async () => {
      await request(app.getHttpServer())
        .get('/items')
        .expect(200)
        .expect([]);

      await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
          price: 10,
        })
        .expect(201);

      await request(app.getHttpServer())
        .get('/items')
        .expect(200)
        .expect((res) => {
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: 'Item 1',
                        price: 10,
                    }),
                ])
            );
        });
    });

    it('should be able to create a new item and get it by id', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
          price: 10,
        })
        .expect(201);

      const createdItemId = createResponse.body.id;

      await request(app.getHttpServer())
        .get(`/items/${createdItemId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                name: 'Item 1',
                price: 10,
              })
            );
          });
    });

    it('should be able to update an item', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
          price: 10,
        })
        .expect(201);

      const createdItemId = createResponse.body.id;

      await request(app.getHttpServer())
        .put(`/items/${createdItemId}`)
        .send({
          name: 'Item 1 updated',
          price: 20,
        })
        .expect(200)
        .expect({
          id: createdItemId,
          name: 'Item 1 updated',
          price: 20,
        });

      await request(app.getHttpServer())
        .get(`/items/${createdItemId}`)
        .expect(200)
        .expect({
          id: createdItemId,
          name: 'Item 1 updated',
          price: 20,
        });
    });

    it('should be able to delete an item', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
          price: 10,
        })
        .expect(201);

      const createdItemId = createResponse.body.id;

      await request(app.getHttpServer())
        .delete(`/items/${createdItemId}`)
        .expect(204);

      await request(app.getHttpServer())
        .get(`/items/${createdItemId}`)
        .expect(404);
    });
  });

  describe('Validations', () => {
    it('should validate required fields', async () => {
      await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
        })
        .expect(400)
        .expect({
          errors: [
            {
              field: 'price',
              message: 'Field "price" is required',
            },
          ],
        });
    });

    it('should not allow for negative pricing for new items', async () => {
      await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
          price: -10,
        })
        .expect(400)
        .expect({
          errors: [
            {
              field: 'price',
              message: 'Field "price" cannot be negative',
            },
          ],
        });
    });

    it('should not allow for negative pricing for updated items', async () => {
      const createResponse = await request(app.getHttpServer())
        .post('/items')
        .send({
          name: 'Item 1',
          price: 10,
        })
        .expect(201);

      const createdItemId = createResponse.body.id;

      await request(app.getHttpServer())
        .put(`/items/${createdItemId}`)
        .send({
          name: 'Item 1 updated',
          price: -20,
        })
        .expect(400)
        .expect({
          errors: [
            {
              field: 'price',
              message: 'Field "price" cannot be negative',
            },
          ],
        });
    });
  });
});