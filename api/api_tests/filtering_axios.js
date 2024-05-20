const {
  getAuthToken,
  retrieveNames,
  retrieveFilter,
  createFilter,
  updateFilter,
  deleteFilter,
} = require('../axios/http_methods');
import {
  FILTER_NOT_FOUND,
  FILTER_EXISTS,
  FIELD_SHOULD_NOT_BE_NULL,
  FILTER_SUCCESSFULLY_UPDATED,
  FILTER_SUCCESSFULLY_DELETED,
} from '../api_constants';

let token;
const payload = {
  conditions: [
    { value: 'new', condition: 'cnt', filteringField: 'name' },
    { filteringField: 'description', value: 'fff', condition: 'cnt' },
  ],
  type: 'launch',
  orders: [
    { isAsc: false, sortingColumn: 'startTime' },
    { isAsc: false, sortingColumn: 'number' },
  ],
  name: 'New_filter11',
  owner: 'superadmin',
};

beforeEach(async () => {
  token = await getAuthToken();
});

describe('API Tests for filtering with Axios', () => {
  it('Retrieve all names for filters', async () => {
    const response = await retrieveNames(token);
    expect(response.response.status).toBe(200);
  });

  it('Retrieve non-existent filter', async () => {
    const invalidIdValue = 4565768;
    const response = await retrieveFilter(token, invalidIdValue);
    expect(response.response.status).toBe(404);
    expect(response.data.message).toEqual(FILTER_NOT_FOUND(invalidIdValue));
  });

  it('Create a new filter', async () => {
    const number = Math.floor(Math.random() * 10000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilter(modifiedPayload, token);
    expect(response.response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
  });

  it('Try to create filter that already exists', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilter(modifiedPayload, token);
    expect(response.response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
    const secondResponse = await createFilter(modifiedPayload, token);
    expect(secondResponse.response.status).toBe(409);
    expect(secondResponse.data.message).toEqual(
      FILTER_EXISTS(modifiedPayload.name)
    );
  });

  it('Create a filter without mandatory property', async () => {
    const modifiedPayload = {
      ...payload,
    };
    delete modifiedPayload.name;
    const response = await createFilter(modifiedPayload, token);
    expect(response.response.status).toBe(400);
    expect(response.data.message).toEqual(FIELD_SHOULD_NOT_BE_NULL('name'));
  });

  it('Update an existing filter', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilter(modifiedPayload, token);
    expect(response.response.status).toBe(201);
    const idFilter = response.data.id;

    modifiedPayload.conditions[0].value = 'newUpdatedFilter';
    const responseUpdate = await updateFilter(idFilter, modifiedPayload, token);
    expect(responseUpdate.response.status).toEqual(200);
    const responseObject = JSON.parse(responseUpdate.response.config.data);
    const actualCondition = responseObject.conditions[0].value;
    const expectedCondition = modifiedPayload.conditions[0].value;
    expect(actualCondition).toEqual(expectedCondition);
    expect(responseUpdate.data.message).toEqual(
      FILTER_SUCCESSFULLY_UPDATED(idFilter)
    );
  });

  it('Update non-existent filter', async () => {
    const response = await updateFilter(0, { ...payload }, token);
    expect(response.response.status).toBe(404);
    expect(response.data.message).toEqual(FILTER_NOT_FOUND(0));
  });

  it('Update a filter with invalid body', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilter(modifiedPayload, token);
    expect(response.response.status).toBe(201);
    const idFilter = response.data.id;
    delete modifiedPayload.conditions;
    const responseUpdate = await updateFilter(idFilter, modifiedPayload, token);
    expect(responseUpdate.response.status).toBe(400);
    expect(responseUpdate.data.message).toEqual(
      FIELD_SHOULD_NOT_BE_NULL('conditions')
    );
  });

  it('Delete an existing filter', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilter(modifiedPayload, token);
    expect(response.response.status).toBe(201);
    const idFilter = response.data.id;

    const responseDelete = await deleteFilter(idFilter, token);
    expect(responseDelete.response.status).toBe(200);
    expect(responseDelete.data.message).toEqual(
      FILTER_SUCCESSFULLY_DELETED(idFilter)
    );
  });

  it('Delete non-existent filter', async () => {
    const responseDelete = await deleteFilter(0, token);
    expect(responseDelete.response.status).toBe(404);
    expect(responseDelete.data.message).toEqual(FILTER_NOT_FOUND(0));
  });
});
