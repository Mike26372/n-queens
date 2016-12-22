/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var board = new Board({n: n});

  var findFirstSolution = function (n, startRow, currBoard) {
    if (n === startRow) {
      return _.map(currBoard.rows(), function(value) {
        return value.slice();
      });
    }
    var i;
    for (i = 0; i < n; i++) {
      currBoard.togglePiece(startRow, i);
      if (!currBoard.hasAnyRooksConflicts()) {
        var result = findFirstSolution(n, startRow + 1, currBoard);
        if (result) {
          return result;
        }
      }
      currBoard.togglePiece(startRow, i);
    }
  };

  var firstSol = findFirstSolution(n, 0, board);
  return firstSol;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var count = 0;
  var board = new Board({n: n});

  var findNSolutionCount = function (n, startRow, currBoard) {
    if (n === startRow) {
      count++;
      return;
    }
    var i;
    for (i = 0; i < n; i++) {
      currBoard.togglePiece(startRow, i);
      if (!currBoard.hasAnyRooksConflicts()) {
        var result = findNSolutionCount(n, startRow + 1, currBoard);
        if (result) {
          return result;
        }
      }
      currBoard.togglePiece(startRow, i);
    }
  };

  findNSolutionCount(n, 0, board);

  return count;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});

  var findFirstSolution = function(n, startRow, currBoard) {
    if (n === startRow) {
      return _.map(currBoard.rows(), function(value) {
        return value.slice();
      });
    }
    var i;
    for (i = 0; i < n; i++) {
      currBoard.togglePiece(startRow, i);
      if (!currBoard.hasAnyQueensConflicts()) {
        var result = findFirstSolution(n, startRow + 1, currBoard);
        if (result) {
          return result;
        }
      }
      currBoard.togglePiece(startRow, i);
    }
  };

  var firstSol = findFirstSolution(n, 0, board); 
  return firstSol || board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var count = 0;
  var board = new Board({n: n});

  var findQSolutionCount = function (n, startRow, currBoard) {
    if (n === startRow) {
      count++;
      return;
    }
    var i;
    for (i = 0; i < n; i++) {
      currBoard.togglePiece(startRow, i);
      if (!currBoard.hasAnyQueensConflicts()) {
        var result = findQSolutionCount(n, startRow + 1, currBoard);
        if (result) {
          return result;
        }
      }
      currBoard.togglePiece(startRow, i);
    }
  };

  findQSolutionCount(n, 0, board);

  return count;

};
