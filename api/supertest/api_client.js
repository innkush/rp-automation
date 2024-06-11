import supertest from 'supertest';
require('dotenv').config();

const username = process.env.RP_USERNAME;
const password = process.env.RP_PASSWORD;
const baseUrl = process.env.BASE_URL;

if (!username || !password || !baseUrl) {
  throw new Error('ReportPortal credentials are not set in environment variables');
}

import {
  AUTH_ENDPOINT,
  FILTER_ENDPOINT,
  CREATE_FILTER,
  GET_ALL_FILTER_NAMES,
} from '../api_constants';

import { validateContentGetNames } from '../schemas';

const headers = {
  accept: 'application/json, text/plain, */*',
  authorization: 'Basic dWk6dWltYW4=',
  'content-type': 'application/x-www-form-urlencoded',
};

const body = `grant_type=password&username=${username}&password=${password}`;

export async function getToken() {
  const response = await supertest(baseUrl)
    .post(AUTH_ENDPOINT)
    .set(headers)
    .send(body)
    .expect(200);

  const responseBody = JSON.parse(response.text);
  return responseBody
}

export async function retrieveNamesSuper(token, statusCode = 200) {
    const headers = {
      Authorization: `bearer ${token.access_token}`,
    };
    const response = await supertest(baseUrl)
    .get(GET_ALL_FILTER_NAMES)
    .set(headers)
    .expect(statusCode);

    const isValid = validateContentGetNames(response._body.content);
    if (!isValid) {
      throw new Error('Schema is not valid');
    }
  }

export async function retrieveFilterSuper(token, filterId, statusCode = 200) {
    const headers = {
      Authorization: `Bearer ${token.access_token}`,
    };
    const response = await supertest(baseUrl)
      .get(FILTER_ENDPOINT(filterId))
      .set(headers)
      .expect(statusCode);

    return response._body;
  }

  export async function createFilterSuper(body, token, statusCode) {
    const headers = {
      Authorization: `Bearer ${token.access_token}`,
    };
    const response = await supertest(baseUrl)
      .post(CREATE_FILTER)
      .set(headers)
      .send(body)
      .expect(statusCode);

    return response._body;
  }

  export async function updateFilterSuper(filterId, body, token, statusCode) {
    const headers = {
      Authorization: `Bearer ${token.access_token}`,
    };
    const response = await supertest(baseUrl)
    .put(FILTER_ENDPOINT(filterId))
    .set(headers)
    .send(body)
    .expect(statusCode);
    return response._body;
  }

  export async function deleteFilterSuper(filterId, token, statusCode) {
    const headers = {
      Authorization: `bearer ${token.access_token}`,
    };
    const response = await supertest(baseUrl)
      .delete(FILTER_ENDPOINT(filterId))
      .set(headers)
      .expect(statusCode);
    return response._body;
  }
