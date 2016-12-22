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

window.hasRowConflictAt = function(board, rowIndex) {
  return board[rowIndex].reduce((acc, curr) => acc + curr, 0) > 1;
},

    // test if any rows on this board contain conflicts
window.hasAnyRowConflicts = function(board) {
  return !!board.reduce((acc, currRow, ind) => acc || this.hasRowConflictAt(board, ind), false);
},



// COLUMNS - run from top to bottom
// --------------------------------------------------------------
//
// test if a specific column on this board contains a conflict
window.hasColConflictAt = function(board, colIndex) {
  return board.reduce((acc, curr) => acc + curr[colIndex], 0) > 1;
},

// test if any columns on this board contain conflicts
window.hasAnyColConflicts = function(board) {
  return !!board.reduce((acc, currRow, ind) => acc || this.hasColConflictAt(board, ind), false);
},


window.hasAnyRooksConflicts = function(board) {
  // console.log('In Rooks Conflicts');
  return this.hasAnyRowConflicts(board) || this.hasAnyColConflicts(board);
};

window.findNRooksSolution = function(n, currentBoard, origN, results = []) {
  var currentBoard = currentBoard || window.makeEmptyMatrix(n);
  var numPieces = origN || parseInt(JSON.stringify(n), 10);
  var childrenTree = [];
  var results = [];
  if (n === 0) {
    var numRooks = currentBoard.reduce((acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0), 0);
    if (numRooks === numPieces) {
      return currentBoard;
    }
    return undefined;
  }
  var length, i, j, k; 
  length = currentBoard.length;

  for (i = 0; i < length; i++) {
    for (j = 0; j < length; j++) {
      if (currentBoard[i][j] === 0) {
        currentBoard[i][j] = 1;
        if (hasAnyRooksConflicts(currentBoard) === false) {
          var temp = currentBoard.map(function(row) {
            return row.map(function(value) {
              return value;
            });
          });
          childrenTree.push(temp);
        }
        currentBoard[i][j] = 0;
      }
    }
  }

  for (k = 0; k < length; k++) {
    var temp = findNRooksSolution(n - 1, childrenTree[k], numPieces);
    if (temp) {
      results = results.concat([temp]);
    }
  }

  // var flatten = function(nestedArray, result) {
  //   var resultsArr = [];
  //   var len = nestedArray.length;
  //   for (var i = 0; i < len; i++) {
  //     if (Array.isArray(nestedArray[i])) {
  //       var result = _.flatten(nestedArray[i]);
  //     } else {
  //       var result = nestedArray[i];
  //     }
  //     resultsArr = resultsArr.concat(result);
  //   }
  //   return resultsArr;
  // };

  // var flattened = flatten(results);
  // var unflatted = [];
  // while (flattened.length > 0) {
  //   unflatted.push(flattened.splice(0, numPieces * numPieces));
  // }


  console.log('90', results);
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
