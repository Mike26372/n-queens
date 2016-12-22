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



window.findNRooksSolution = function(n, currentBoard, origN, results = []) {
  console.log('currentBoard ', currentBoard);
  var currentBoard = currentBoard || window.makeEmptyMatrix(n);
  var currentBoardObj = new Board(currentBoard);
  console.log('N = ' + n);
  currentBoardObj.childrenTree = [];
  if (n === 0) {
    // NEED TO REFACTOR
    var numRooks = currentBoardObj.rows().reduce((acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0), 0);
    // var numRooks = currentBoard.reduce((acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0), 0);
    console.log(numRooks);
    if (numRooks === origN) {
      return currentBoardObj.rows();
    }
    return undefined;
  }
  currentBoardObj.rows().forEach(function(row, rowInd) {
    row.forEach(function (col, colInd) {
      if (col === 0) {
        // currentBoardObj.get(rowInd)[colInd] = 1; 
        currentBoardObj.togglePiece(rowInd, colInd);
        console.log('Board after toggle: ' + currentBoardObj.rows());
        if (currentBoardObj.hasAnyRooksConflicts() === false) {
          var tempBoard = new Board(currentBoardObj.rows());
          console.log('49 ', tempBoard.rows());
          // currentBoardObj.childrenTree.push(tempBoard.rows());
          var test = new Board(currentBoardObj.rows());
          //console.log('Test board: ' + test.rows());
          //console.log('Test', test);
          currentBoardObj.childrenTree.push(test.rows());
        }
        // currentBoardObj.get(rowInd)[colInd] = 0;
        currentBoardObj.togglePiece(rowInd, colInd);
      }
    });
  });
  // Try passing in matrix to findNRooks instead of object; push matrix to children as well
  console.log('# childrenTree: ' + currentBoardObj.childrenTree.length);
  console.log(currentBoardObj.childrenTree);
  currentBoardObj.childrenTree.forEach(function(childArr, ind, arr) {
    console.log('Child Board: ' + childArr);
    var temp = findNRooksSolution(n - 1, childArr, n);
    results.push(temp);
  });
  console.log('Results: ');
  console.log(results[0]);
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
