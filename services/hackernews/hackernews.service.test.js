const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
chai.config.includeStack = true;
const { expect } = chai;

const {fetchNewStories} = require('./hackernews.service');

describe('# [service] hackernews.service', () => {
    describe('## [function] fetchNewStories', async() => {
        it('should return new stories', async() => {
            const storyResult = await fetchNewStories();
            expect(storyResult.data).to.have.lengthOf.above(0);
        });
    });
});
