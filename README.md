📘 Crossword Solver — Piscine JavaScript

This project is part of the Piscine JavaScript curriculum and focuses on backtracking, logic, and problem-solving.
The goal is to build a program that reads a crossword puzzle grid and determines whether it can be filled using a given list of words.

🎯 Project Objective

Parse a crossword puzzle represented as a grid where:

0 represents an empty cell that must be filled with letters.

1 represents a blocked cell.

. represents a pre-filled letter in the puzzle.

Read a list of words provided as input.

Detect all valid horizontal and vertical slots where words can be placed.

Use backtracking to try placing words and generate solutions.

Validate that:

Each word fits perfectly in its slot,

Pre-filled letters match,

No conflicts occur across the grid.

Output:

The completed crossword if exactly one valid solution exists.

Error in all other cases (zero or multiple solutions).

🔧 Key Features

Slot detection (horizontal + vertical).

Word placement validation.

Efficient backtracking with pruning.

Support for puzzles containing fixed letters.

Detection of multiple solutions.

Returns a clean, formatted crossword result.

🧠 Skills Practiced

Backtracking algorithms

Grid parsing

Recursion

Problem-solving

Clean code structure
