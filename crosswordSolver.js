function crosswordSolver(puzzle, words) {
    // check input
    if (typeof puzzle !== 'string' || !Array.isArray(words) || puzzle.length === 0) {
        console.log('Error');
        return;
    }

    // Validate words
    for (const word of words) {
        if (typeof word !== 'string' || word.length === 0 || !/^[a-zA-Z]+$/.test(word)) {
            console.log('Error');
            return;
        }
    }
    // Check for duplicate words
    if (new Set(words).size !== words.length) {
        console.log('Error');
        return;
    }

    //grid
    const lines = puzzle.split('\n')
    const grid = lines.map((a) => a.split(''))
    const rows = grid.length
    const cols = grid[0] ? grid[0].length : 0

    if (rows === 0 || cols === 0) {
        console.log('Error');
        return;
    }

    // validate grid
    for (let i = 0; i < rows; i++) {
        if (grid[i].length !== cols) {
            console.log('Error');
            return;
        }
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] !== '.' && !/^[0-2]$/.test(grid[i][j])) {
                console.log('Error');
                return;
            }
        }
    }
}