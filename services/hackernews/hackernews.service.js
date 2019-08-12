const API_URL = 'https://hacker-news.firebaseio.com/v0/';
const requestService = require('../request/request.service');

function fetchNewStories() {
    return requestService.callRequest({
        method: 'GET',
        url: `${API_URL}newstories.json`,
    });
}

function fetchItem(itemId) {
    if (!itemId) {
        throw new Error('There is no itemId to fetch');
    }
    return requestService.callRequest({
        method: 'GET',
        url: `${API_URL}item/${itemId}.json`,
    });
}

function fetchUser(user) {
    if (!user) {
        throw new Error('There is no user to fetch');
    }
    return requestService.callRequest({
        method: 'GET',
        url: `${API_URL}user/${user}.json`,
    });
}

function fetchMaxItem() {
    return requestService.callRequest({
        method: 'GET',
        url: `${API_URL}maxitem.json`,
    });
}

async function findAPostFromADay(postTime, start, end) {
    if (start > end) {
        return false;
    }

    let mid = Math.floor((start + end) / 2);

    const itemResult = await fetchItem(mid);
    const itemTime = itemResult.data.time * 1000;

    // if it is comment and if it is before story
    if (itemTime < postTime) {
        return await findAPostFromADay(postTime, mid + 1, end);
    }

    const storyResult = await findStory(itemResult);
    const storyTime = storyResult.data.time * 1000;

    const storyDate = getFormattedDate(new Date(storyTime));
    const pastDate = getFormattedDate(new Date(postTime));

    if (storyDate === pastDate) {
        return storyResult;
    }

    if (storyTime > postTime) {
        return await findAPostFromADay(postTime, start, mid - 1);
    } else {
        return await findAPostFromADay(postTime, mid + 1, end);
    }
}

async function findStory(itemResult) {
    if (!itemResult.data.parent) {
        return itemResult;
    }
    return findStory(await fetchItem(itemResult.data.parent));
}

function getFormattedDate(date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
}

module.exports = { fetchNewStories, fetchItem, fetchUser, fetchMaxItem, findAPostFromADay, getFormattedDate };
