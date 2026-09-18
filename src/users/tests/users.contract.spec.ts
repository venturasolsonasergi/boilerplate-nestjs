import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { CreateUserUseCase } from '../application/create-user.use-case';
import { EmailAlreadyExistsError } from '../application/user.repository';
import { UsersController } from '../infrastructure/users.controller';

describe('users contract', () => {
  let app: INestApplication;
  const execute = jest.fn();

  beforeEach(async () => {
    execute.mockReset();
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: CreateUserUseCase, useValue: { execute } }],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('creates a user with the persisted id', async () => {
    const user = {
      id: 1,
      name: ' Ada ',
      surname: ' Lovelace ',
      email: 'ada@example.com',
      address: ' 1 Main Street ',
      phone: '555-0100',
    };
    execute.mockResolvedValue({
      ...user,
      name: 'Ada',
      surname: 'Lovelace',
      address: '1 Main Street',
    });

    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        phone: user.phone,
      })
      .expect(201)
      .expect({
        ...user,
        name: 'Ada',
        surname: 'Lovelace',
        address: '1 Main Street',
      });
  });

  it('rejects invalid and unknown fields', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: '',
        surname: 'Lovelace',
        email: 'invalid',
        address: 'Street',
        phone: '555',
        id: 9,
      })
      .expect(400);

    expect(execute).not.toHaveBeenCalled();
  });

  it('maps duplicate email errors to conflict', async () => {
    execute.mockRejectedValue(new EmailAlreadyExistsError());

    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Ada',
        surname: 'Lovelace',
        email: 'ada@example.com',
        address: 'Street',
        phone: '555',
      })
      .expect(409)
      .expect({
        statusCode: 409,
        message: 'Email already exists',
        error: 'Conflict',
      });
  });

  it('preserves the health endpoint', async () => {
    await request(app.getHttpServer())
      .get('/users/health')
      .expect(200)
      .expect({ status: 'ok' });
  });
});
