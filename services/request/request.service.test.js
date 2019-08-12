const chai = require('chai');
const { expect } = chai;
const requestService = require('./request.service');
chai.config.includeStack = true;

describe('# [service] request.service', () => {
    describe('## [function] callRequest', async() => {
        const callRequest = requestService.callRequest;

        it('should throw an error without options ', async() => {
            expect(callRequest).to.throw();
        });

        it('should throw an error with empty url', async() => {
            try {
                await callRequest({ url: 'http::::test'});
            } catch (e) {
                expect(e.status).to.equal(-1);
                expect(e.error.toString()).to.equal('Error: Invalid URI "http::::test"');
            }
        });

        it('should return json data', async() => {
            const options = {
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/todos/1'
            };
            const result = await callRequest(options);
            expect(result.status).to.equal(0);
            expect(result.data).to.deep.eql({
                userId: 1,
                id: 1,
                title: 'delectus aut autem',
                completed: false
            });
        });
    });
});
