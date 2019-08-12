const chai = require('chai');
const sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
chai.config.includeStack = true;
const { expect } = chai;

const {mapWordCounts, getListOfOrderedWordCounts} = require('./word.service');

const testTextList = [
    'Hello world',
    'Hello earth',
    'HELLO DarkNess my Old Friend'
];

const expectedWordsCount = {
    hello: 3,
    world: 1,
    earth: 1,
    darkness: 1,
    my: 1,
    old: 1,
    friend: 1
};

describe('# [service] word.service', () => {
    describe('## [function] mapWordCounts', () => {
        it('should return word counts correct', () => {
            const wordCounts = mapWordCounts(testTextList);
            expect(wordCounts).to.deep.equal(expectedWordsCount);
        });
    });
    describe('## [function] getListOfOrderedWordCounts', () => {
        it('should sort word counts correct', () => {
            const wordsList = getListOfOrderedWordCounts(expectedWordsCount);
            expect(wordsList).to.deep.equal([
                {
                    key: 'hello',
                    value: 3
                },
                {
                    key: 'world',
                    value: 1
                },
                {
                    key: 'earth',
                    value: 1
                },
                {
                    key: 'darkness',
                    value: 1
                },
                {
                    key: 'my',
                    value: 1
                },
                {
                    key: 'old',
                    value: 1
                },
                {
                    key: 'friend',
                    value: 1
                }
            ]);
        });
    });
});
