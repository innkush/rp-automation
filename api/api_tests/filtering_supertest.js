import {
  retrieveNamesSuper,
  getToken,
  retrieveFilterSuper,
  createFilterSuper,
  updateFilterSuper,
  deleteFilterSuper,
} from '../supertest/api_client';
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
  token = await getToken();
});

describe('API Tests for filtering with Supertest', () => {
  it('Retrieve all names for filters', async () => {
    await retrieveNamesSuper(token);
  });

  it('Retrieve non-existent filter', async () => {
    const invalidIdValue = 4565768;
    const response = await retrieveFilterSuper(token, invalidIdValue, 404);
    expect(response.message).toEqual(FILTER_NOT_FOUND(invalidIdValue));
  });

  it('Create a new filter', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilterSuper(modifiedPayload, token, 201);
    expect(response).toHaveProperty('id');
  });

  it('Try to create a filter that already exists', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilterSuper(modifiedPayload, token, 201);
    expect(response).toHaveProperty('id');
    const secondResponse = await createFilterSuper(modifiedPayload, token, 409);
    expect(secondResponse.message).toEqual(FILTER_EXISTS(modifiedPayload.name));
  });

  it('Create a filter without mandatory property', async () => {
    const modifiedPayload = {
      ...payload,
    };
    delete modifiedPayload.name;
    const response = await createFilterSuper(modifiedPayload, token, 400);
    expect(response.message).toEqual(FIELD_SHOULD_NOT_BE_NULL('name'));
  });

  it('Update an existing filter', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilterSuper(modifiedPayload, token, 201);
    const idFilter = response.id;

    modifiedPayload.conditions[0].value = 'newUpdatedFilter';
    const responseUpdate = await updateFilterSuper(
      idFilter,
      modifiedPayload,
      token,
      200
    );
    expect(responseUpdate.message).toEqual(
      FILTER_SUCCESSFULLY_UPDATED(idFilter)
    );
  });

  it('Update non-existent filter', async () => {
    const response = await updateFilterSuper(0, { ...payload }, token, 404);
    expect(response.message).toEqual(FILTER_NOT_FOUND(0));
  });

  it('Update a filter with invalid body', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilterSuper(modifiedPayload, token, 201);
    const idFilter = response.id;
    delete modifiedPayload.conditions;
    const responseUpdate = await updateFilterSuper(
      idFilter,
      modifiedPayload,
      token,
      400
    );
    expect(responseUpdate.message).toEqual(
      FIELD_SHOULD_NOT_BE_NULL('conditions')
    );
  });

  it('Delete an existing filter', async () => {
    const number = Math.floor(Math.random() * 1000);
    const modifiedPayload = {
      ...payload,
      name: 'newFilter' + number,
    };
    const response = await createFilterSuper(modifiedPayload, token, 201);
    const idFilter = response.id;

    const responseDelete = await deleteFilterSuper(idFilter, token, 200);
    expect(responseDelete.message).toEqual(
      FILTER_SUCCESSFULLY_DELETED(idFilter)
    );
  });

  it('Delete non-existent filter', async () => {
    const responseDelete = await deleteFilterSuper(0, token, 404);
    expect(responseDelete.message).toEqual(FILTER_NOT_FOUND(0));
  });
});
