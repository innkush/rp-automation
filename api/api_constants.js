
const AUTH_ENDPOINT = '/uat/sso/oauth/token';
const GET_ALL_FILTERS = '/v1/superadmin_personal/filters';
const CREATE_FILTER = '/v1/superadmin_personal/filter';
const FILTER_ENDPOINT = (filterId) => `/v1/superadmin_personal/filter/${filterId}`;
const GET_ALL_FILTER_NAMES = '/v1/superadmin_personal/filter/names';

export {
    AUTH_ENDPOINT,
    GET_ALL_FILTERS,
    GET_ALL_FILTER_NAMES,
    CREATE_FILTER,
    FILTER_ENDPOINT,
}
