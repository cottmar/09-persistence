'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { name: 'test name', breed: 'test breed' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/doge', () => {
    it('should respond with status 201 and create a new doge', () => {
      return superagent.post(`:${testPort}/api/v1/doge`)
        .send(mockResource)
        .then((response) => {
          mockId = response.body.id;
          expect(response.body.name).toEqual(mockResource.name);
          expect(response.body.breed).toEqual(mockResource.breed);
          expect(response.status).toEqual(201);
        });
    });
  });

  describe('BAD REQUEST no request body was provided', () => {
    describe('POST /api/v1/doge', () => {
      it('should respond with status 400 if no request body was provided or the body was invalid', () => {
        return superagent.post(`:${testPort}/api/v1/doge`)
          .send({})
          .then()
          .catch((err) => {
            expect(err).toBeTruthy();
            expect(err.status).toEqual(400);
          });
      });
    });
  });

  describe('NOT FOUND', () => {
    describe('GET /api/v1/doge', () => {
      it('it should respond with NOT FOUND for valid requests made with an id that was not found', () => {
        return superagent.get(':5000/api/v1/doge')
          .then(() => {})
          .catch((err) => {
            expect(err).toBeTruthy();
            expect(err.status).toEqual(404);
          });
      });
    });
  });

  describe('BAD REQUEST', () => {
    describe('GET /api/v1/cowsay', () => {
      it('should err out with 400 status code because no id was provided in the request', () => {
        return superagent.get(':5000/api/v1/cowsay')
          .then(() => {})
          .catch((err) => {
            expect(err.status).toEqual(400);
            expect(err).toBeTruthy();
          });
      });
    });

    describe('VALID request to the API', () => {
      describe('GET /api/v1/doge', () => {
        it('it should contain a response body for a request made with a valid id', () => {
          return superagent.get(`:${testPort}/api/v1/doge?id=${mockId}`)
            .then((response) => {
              mockId = response.body.id;
              expect(response.body.name).toEqual(mockResource.name);
              expect(response.body.breed).toEqual(mockResource.breed);
              expect(response.status).toEqual(200);
            });
        });
      });
    });
  });
});
