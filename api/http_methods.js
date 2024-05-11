import axios from 'axios';
import APIClient from './http_client';
import {
  AUTH_ENDPOINT,
  CREATE_FILTER,
  FILTER_ENDPOINT,
  GET_ALL_FILTERS,
  GET_ALL_FILTER_NAMES,
} from './api_constants';
const logger = require('logger');
const apiClient = new APIClient(baseUrl, getAuthToken);

const username = Cypress.env('RP_USERNAME');
const password = Cypress.env('RP_PASSWORD');
const baseUrl = Cypress.env('baseUrl');

async function getAuthToken() {
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
    return tokenResponse;
  } catch (error) {
    logger.info(`Failed to fetch authentication token: ${error.message}`);
    throw error;
  }
}

async function retrieveAllFilters() {
  const response = await apiClient.sendRequest('GET', GET_ALL_FILTERS);
  return response.data;
}

async function createFilter(body) {
  const response = await apiClient.sendRequest('POST', CREATE_FILTER, body);
  return response.data;
}

async function updateFilter(filterId, payload) {
  const response = await apiClient.sendRequest(
    'PUT',
    FILTER_ENDPOINT(filterId),
    payload
  );
  return response.data;
}

async function retrieveNames() {
  const response = await apiClient('GET', GET_ALL_FILTER_NAMES);
  return response.data;
}

async function deleteFilter(filterId) {
  const response = await apiClient.sendRequest(
    'DELETE',
    FILTER_ENDPOINT(filterId)
  );
  return response.data;
}

export {
  retrieveAllFilters,
  createFilter,
  updateFilter,
  retrieveNames,
  deleteFilter,
  getAuthToken,
};
