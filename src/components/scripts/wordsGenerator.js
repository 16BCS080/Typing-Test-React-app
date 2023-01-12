import randomWords from "random-words"; 

const wordsGenerator = (wordsCount) => {     
    const randomWordsGenerated = randomWords({ exactly: wordsCount, maxLength: 7 });
    const words = [];
    for (let i = 0; i < wordsCount; i++) {
        words.push({key: randomWordsGenerated[i], val: randomWordsGenerated[i]});
      } 
    return words;  
};



export { wordsGenerator };
