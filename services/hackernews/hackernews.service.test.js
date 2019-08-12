const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
chai.config.includeStack = true;
const { expect } = chai;

const {fetchNewStories, fetchItem} = require('./hackernews.service');

describe('# [service] hackernews.service', () => {
    describe('## [function] fetchNewStories', async() => {
        it('should return new stories', async() => {
            const storyResult = await fetchNewStories();
            expect(storyResult.data).to.have.lengthOf.above(0);
        });
    });

    describe('## [function] fetchItem', async() => {
        it('should return new stories', async() => {
            const itemResult = await fetchItem(20673328);
            expect(itemResult.data.id).to.equal(20673328);
        });

        it('should throw error withoyt itemId', async(done) => {
            try {
                await fetchItem();
            } catch (e) {
                expect(e.message).to.equal('There is no itemId to fetch');
                done();
            }
        });
    });
});
