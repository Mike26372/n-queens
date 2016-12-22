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


window.makeEmptyMatrix = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};



window.findNRooksSolution = function(n) {
  var board = new Board({'n': n});
  // console.log(board.rows());
  var results = [];
  var tempRow = 0;
  var tempCol = 0;

  var checkNewBoard = function(newBoard) {
    var count = newBoard.rows().reduce((acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0), 0);
    var length = newBoard.rows().length;

    if (count === n) {
      results.push(newBoard.rows());
      console.log(tempRow, tempCol);
      //newBoard.togglePiece(tempRow, tempCol);
    }

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let currentBoard = newBoard.rows().slice();
        let tempBoard = new Board(currentBoard);

        if (tempBoard.rows()[i][j] === 1) {
          continue;
        }

        tempBoard.togglePiece(i, j);

        if (!tempBoard.hasAnyRooksConflicts()) {
          checkNewBoard(tempBoard);
        } else {
          tempBoard.togglePiece(i, j);
        }
      }
    }
  };

  checkNewBoard(board);
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(results));
  console.log('solutions ' + results);
  return results[0];
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = findNRooksSolution(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  console.log(solutionCount);
  return solutionCount.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
