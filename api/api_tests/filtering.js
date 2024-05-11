const chai = require('chai')
const expect = chai.expect;
import {  retrieveAllFilters } from '../http_methods';


describe('API Tests for filtering', () => {


    it('Retrieve all filters', async () => {

        const response = await retrieveAllFilters();
        expect(response.body.statusCode).equal('200');
        expect(response.body).is.not.empty;

    })

})
