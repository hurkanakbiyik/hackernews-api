const API_URL = 'https://hacker-news.firebaseio.com/v0/';
const requestService = require('../request/request.service');

function fetchNewStories() {
    return requestService.callRequest({
        method: 'GET',
        url: `${API_URL}newstories.json`,
    });
}

module.exports = { fetchNewStories };
