const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
chai.config.includeStack = true;
const { expect } = chai;

const {fetchNewStories, fetchItem, fetchUser, findAPostFromADay} = require('./hackernews.service');

describe('# [service] hackernews.service', () => {
    describe('## [function] fetchNewStories', async() => {
        it('should return new stories', async() => {
            const storyResult = await fetchNewStories();
            expect(storyResult.data).to.have.lengthOf.above(0);
        });
    });

    describe('## [function] fetchItem', async() => {
        it('should return item', async() => {
            const itemResult = await fetchItem(20673328);
            expect(itemResult.data.id).to.equal(20673328);
        });

        it('should throw error without itemId', async(done) => {
            try {
                await fetchItem();
            } catch (e) {
                expect(e.message).to.equal('There is no itemId to fetch');
                done();
            }
        });
    });

    describe('## [function] fetchUser', async() => {
        it('should return new stories', async() => {
            const itemResult = await fetchUser('jl');
            expect(itemResult.data.id).to.equal('jl');
        });

        it('should throw error without userId', async(done) => {
            try {
                await fetchUser();
            } catch (e) {
                expect(e.message).to.equal('There is no user to fetch');
                done();
            }
        });
    });

    describe('## [function] findAPostFromADay', async() => {
        it('should not return a story', async() => {
            const currentDate = new Date();
            const pastDate = currentDate.getDate() - 7;
            currentDate.setDate(pastDate);
            const itemResult = await findAPostFromADay(currentDate.getTime(), 1, 5);
            expect(itemResult).to.equal(false);
        });
    });
});
