
const AUTH_ENDPOINT = '/uat/sso/oauth/token';
const GET_ALL_FILTERS = '/api/v1/superadmin_personal/filter/filters';
const CREATE_FILTER = '/api/v1/superadmin_personal/filter';
const FILTER_ENDPOINT = (filterId) => `/api/v1/superadmin_personal/filter/${filterId}`;
const GET_ALL_FILTER_NAMES = '/api/v1/superadmin_personal/filter/names';

const FILTER_NOT_FOUND = (id) => `User filter with ID '${id}' not found on project 'superadmin_personal'. Did you use correct User Filter ID?`;
const FILTER_EXISTS = (filterName) =>`User filter with name '${filterName}' already exists for user 'superadmin' under the project 'superadmin_personal'. You couldn't create the duplicate.`;
const FIELD_SHOULD_NOT_BE_NULL= (field) => `Incorrect Request. [Field '${field}' should not be null.] `;
const FILTER_SUCCESSFULLY_UPDATED = (id) => `User filter with ID = '${id}' successfully updated.`;
const FILTER_SUCCESSFULLY_DELETED = (id) => `User filter with ID = '${id}' successfully deleted.`;

export {
    AUTH_ENDPOINT,
    GET_ALL_FILTERS,
    GET_ALL_FILTER_NAMES,
    CREATE_FILTER,
    FILTER_ENDPOINT,
    FILTER_NOT_FOUND,
    FILTER_EXISTS,
    FIELD_SHOULD_NOT_BE_NULL,
    FILTER_SUCCESSFULLY_UPDATED,
    FILTER_SUCCESSFULLY_DELETED,
}
