const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
chai.config.includeStack = true;
const { expect } = chai;

const {mapWordCounts} = require('./word.service');

const testTextList = [
    'Hello world',
    'Hello earth',
    'HELLO DarkNess my Old Friend'
];

describe('# [service] word.service', () => {
    describe('## [function] mapWordCounts', async() => {
        it('should return word counts correct', async() => {
            const storyResult = await mapWordCounts(testTextList);
            expect(storyResult).to.deep.equal({
                hello: 3,
                world: 1,
                earth: 1,
                darkness: 1,
                my: 1,
                old: 1,
                friend: 1
            });
        });
    });
});
