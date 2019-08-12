function getWords(text) {
    const regex = /[a-z'\-]+/g;
    return text.match(regex);
}

function mapWordCounts(textList) {
    const wordMap = {};
    for (let i = 0; i < textList.length; i++) {
        const wordList = getWords(textList[i].toLowerCase());
        for (let k = 0; k < wordList.length; k++) {
            const word = wordList[k];
            if (!wordMap[word]) {
                wordMap[word] = 1;
            } else {
                wordMap[word]++;
            }
        }
    }
    return wordMap;
}

module.exports = {mapWordCounts};
