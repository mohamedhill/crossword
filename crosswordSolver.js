function crosswordSolver(puzzle,words){
    if (typeof puzzle !== 'string' || !Array.isArray(words)) {
        console.log('Error');
        return;
    }

    for (const word of words) {
        if (typeof word !== 'string' || word.length === 0) {
            console.log('Error');
            return;
        }
    }

    if (new Set(words).size !== words.length) {
        console.log('Error');
        return;
    }
}