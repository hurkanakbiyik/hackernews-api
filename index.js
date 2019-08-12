const {
    fetchNewStories,
    fetchItem,
    fetchMaxItem,
    findAPostFromADay,
    getFormattedDate,
    fetchUser
} = require('./services/hackernews/hackernews.service');
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
        data: topWords,
    });
});

app.get('/commonWordsLastWeekPost', async(req, res) =>{
    const maxItemResult = await fetchMaxItem();
    const maxItem = maxItemResult.data;
    const currentDate = new Date();
    const pastDate = currentDate.getDate() - 7;
    currentDate.setDate(pastDate);
    const postResult = await findAPostFromADay(currentDate.getTime(), maxItem / 2, maxItem);

    res.send({
        data: {
            post: postResult.data,
            lastWeekDate: getFormattedDate(currentDate),
            storyDate: getFormattedDate(new Date(postResult.data.time * 1000)),
            wordsCount: getListOfOrderedWordCounts(mapWordCounts([postResult.data.title]))
        },
    });
});

app.get('/commonWordsTopUsers', async(req, res) =>{
    const newStoriesResult = await fetchNewStories();
    const fetchStoryPromises = newStoriesResult.data.map(storyId => fetchItem(storyId));
    const storiesDetailResults = await Promise.all(fetchStoryPromises);
    const users = storiesDetailResults.map((storyResult, storyIndex) => ({user: storyResult.data.by, storyIndex}));
    const fetchUserPromises = users.map(userData => fetchUser(userData.user));
    const userDetailResults = await Promise.all(fetchUserPromises);

    const wordsCount = mapWordCounts(
        storiesDetailResults
            .filter((storyResult, index) =>
                storyResult.status === 0
                && storyResult.data
                && userDetailResults[index].data.karma >= 10000
            )
            .map(storyResult => storyResult.data.title)
    );
    const topWords = getListOfOrderedWordCounts(wordsCount).slice(0, 10);
    res.send({
        data: topWords
    });
});

app.listen(3000);
