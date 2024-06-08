import axios from 'axios';
import APIClient from './http_client';
import { validateContentGetNames } from '../schemas';
import {
  AUTH_ENDPOINT,
  CREATE_FILTER,
  FILTER_ENDPOINT,
  GET_ALL_FILTER_NAMES,
} from '../api_constants';
require('dotenv').config();

const username = process.env.RP_USERNAME;
const password = process.env.RP_PASSWORD;
const baseUrl = process.env.BASE_URL;

if (!username || !password || !baseUrl) {
  throw new Error('ReportPortal credentials are not set in environment variables');
}

import { logger } from '../logger';

export async function getAuthToken() {
  try {
    const tokenResponse = await axios.post(
      baseUrl + AUTH_ENDPOINT,
      `grant_type=password&username=${username}&password=${password}`,
      {
        headers: {
          accept: 'application/json, text/plain, */*',
          authorization: 'Basic dWk6dWltYW4=',
          'content-type': 'application/x-www-form-urlencoded',
        },
      }
    );
    logger.info('TOKEN', tokenResponse.data);
    return tokenResponse.data;
  } catch (error) {
    logger.info(`Failed to fetch authentication token: ${error.message}`);
    throw error;
  }
}

const apiClient = new APIClient(baseUrl);

export async function retrieveFilter(token, filterId) {
  const headers = {
    Authorization: `Bearer ${token.access_token}`,
  };
  const response = await apiClient.sendRequest(
    'GET',
    FILTER_ENDPOINT(filterId),
    undefined,
    headers
  );
  return response;
}

export async function createFilter(body, token) {
  const headers = {
    Authorization: `Bearer ${token.access_token}`,
  };
  const response = await apiClient.sendRequest(
    'POST',
    CREATE_FILTER,
    body,
    headers
  );
  return response;
}

export async function updateFilter(filterId, body, token) {
  const headers = {
    Authorization: `Bearer ${token.access_token}`,
  };
  const response = await apiClient.sendRequest(
    'PUT',
    FILTER_ENDPOINT(filterId),
    body,
    headers
  );
  return response;
}

export async function retrieveNames(token) {
  const headers = {
    Authorization: `bearer ${token.access_token}`,
  };
  const response = await apiClient.sendRequest(
    'GET',
    GET_ALL_FILTER_NAMES,
    undefined,
    headers
  );
  logger.info(JSON.stringify(response.data.content));

  const isValid = validateContentGetNames(response.data.content);
  if (!isValid) {
    throw new Error('Schema is not valid');
  }

  return response;
}

export async function deleteFilter(filterId, token) {
  const headers = {
    Authorization: `bearer ${token.access_token}`,
  };
  const response = await apiClient.sendRequest(
    'DELETE',
    FILTER_ENDPOINT(filterId),
    undefined,
    headers,
  );
  return response;
}
