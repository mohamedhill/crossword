function crosswordSolver(puzzle, words) {
  // check input
  if (
    typeof puzzle !== "string" ||
    !Array.isArray(words) ||
    puzzle.length === 0
  ) {
    console.log("Error");
    return;
  }

  // Validate words
  for (const word of words) {
    if (
      typeof word !== "string" ||
      word.length === 0 ||
      !/^[a-zA-Z]+$/.test(word)
    ) {
      console.log("Error");
      return;
    }
  }
  // Check for duplicate words
  if (new Set(words).size !== words.length) {
    console.log("Error");
    return;
  }

  //grid
  const lines = puzzle.split("\n");
  const grid = lines.map((a) => a.split(""));
  const rows = grid.length;
  const cols = grid[0] ? grid[0].length : 0;

  if (rows === 0 || cols === 0) {
    console.log("Error");
    return;
  }

  // validate grid
  for (let i = 0; i < rows; i++) {
    if (grid[i].length !== cols) {
      console.log("Error");
      return;
    }
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] !== "." && !/^[0-2]$/.test(grid[i][j])) {
        console.log("Error");
        return;
      }
    }
  }

  const slots = [];

  for (let i = 0; i < rows; i++) {
    const rowStr = grid[i].join("");
    for (const match of rowStr.matchAll(/[^.]+/g)) {
      if (match[0].length > 1) {
        slots.push({
          row: i,
          col: match.index,
          dir: "H",
          len: match[0].length,
        });
      }
    }
  }

  for (let j = 0; j < cols; j++) {
    const colStr = grid.map((row) => row[j]).join("");
    for (const match of colStr.matchAll(/[^.]+/g)) {
      if (match[0].length > 1) {
        slots.push({
          row: match.index,
          col: j,
          dir: "V",
          len: match[0].length,
        });
      }
    }
  }

  if (slots.length !== words.length) {
    console.log("Error");
    return;
  }
   const actualStarts = {};
    for (const slot of slots) {
        const key = `${slot.row},${slot.col}`;
        actualStarts[key] = (actualStarts[key] || 0) + 1;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] !== '.') {
                if (parseInt(grid[i][j]) !== (actualStarts[`${i},${j}`] || 0)) {
                    console.log('Error');
                    return;                                    
                }
            }
        }
    }


  //backtracking solver
  const solution = grid.map(row => [...row]);
  let count = 0;
  let result = null;
  const used = new Set();


  function getPositions(slot) {
    const pos = [];
    for (let k = 0; k < slot.len; k++) {
      const r = slot.dir === 'H' ? slot.row : slot.row + k;
      const c = slot.dir === 'H' ? slot.col + k : slot.col;
      pos.push([r, c]);
    }
    return pos;
  }

  function canPlace(slot, word) {
    if (word.length !== slot.len) return false;
    const pos = getPositions(slot);
    for (let k = 0; k < pos.length; k++) {
      const [r, c] = pos[k];
      const cur = solution[r][c];
      if (!/^[0-9]$/.test(cur) && cur !== word[k]) {

        return false;
      }
    }
    return true;
  }

  function place(slot, word) {
    const old = [];
    const pos = getPositions(slot);
    for (let k = 0; k < pos.length; k++) {
      const [r, c] = pos[k];
      old.push(solution[r][c]);
      solution[r][c] = word[k];
    }
    return old;
  }

  function unplace(slot, old) {
    const pos = getPositions(slot);
    for (let k = 0; k < pos.length; k++) {
      const [r, c] = pos[k];
      solution[r][c] = old[k];
    }
  }

  function solve(idx = 0) {
    if (count == 1) return;
    if (idx === slots.length) {
      count++;
      if (count === 1) result = solution.map(r => r.join('')).join('\n');
      return;
    }

    for (const word of words) {
      if (used.has(word)) continue;
      if (!canPlace(slots[idx], word)) continue;


      used.add(word);
      const old = place(slots[idx], word);
      solve(idx + 1);
      unplace(slots[idx], old);
      used.delete(word);
    }
  }

  solve();
  function isValidSolution(solution, words) {

    const letters = [...new Set(words.join(''))].join('');


    const regex = new RegExp(`^[.${letters}]+$`);


    const flat = solution.replace(/\n/g, '');


    if (flat.includes('0') || flat.includes('1') || flat.includes('2')) {
      return false;
    }


    return regex.test(flat);
  }
  if (count === 0) {
    console.log('No solution');
  } else if (count > 1) {
    console.log('Multiple solutions');
  } else {
    if (isValidSolution(result, words)) {
      console.log(result);
    } else {
      console.log('Error');
    }
  }


}
const puzzle = '100\n.1.\n.0.'
const words = ['asd','ad']

crosswordSolver(puzzle, words)
