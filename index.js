const {fetchNewStories, fetchItem} = require('./services/hackernews/hackernews.service');
const Promise = require('bluebird');
const express = require('express');
const {mapWordCounts, getListOfOrderedWordCounts} = require('./services/word/word.service');
const app = express();

app.get('/health', (req, res) => {
    res.sendStatus(200);
});

app.get('/commonWords', async(req, res) =>{
    const newStoriesResult = await fetchNewStories();
    const requiredStories = newStoriesResult.data.slice(0, 25);
    const fetchStoryPromises = requiredStories.map(storyId => fetchItem(storyId));
    const storiesDetailResults = await Promise.all(fetchStoryPromises);
    const wordsCount = mapWordCounts(
        storiesDetailResults
            .filter(storyResult => storyResult.status === 0 && storyResult.data)
            .map(storyResult => storyResult.data.title)
    );
    const topWords = getListOfOrderedWordCounts(wordsCount).slice(0, 10);
    res.send({
        data: topWords
    });
});

app.listen(3000);
