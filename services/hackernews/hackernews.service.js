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

module.exports = { fetchNewStories, fetchItem };
