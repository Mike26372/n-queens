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



window.findNRooksSolution = function(n, currentBoard = window.makeEmptyMatrix(n), origN, results = []) {
  var currentBoardObj = new Board(currentBoard);
  console.log('N = ' + n);
  // currentBoardObj = currentBoardObj || new Board({'n': n}); 
  currentBoardObj.childrenTree = [];
  if (n === 0) {
    // NEED TO REFACTOR
    var numRooks = currentBoardObj.rows().reduce((acc, curr) => acc + curr.reduce((acc2, curr2) => acc2 + curr2, 0), 0);
    // console.log('Current Board at N = 0: ' + currentBoardObj.rows());
    console.log(numRooks);
    if (numRooks === origN) {
      // results.push(currentBoardObj.rows());
      return currentBoardObj.rows();
    }
    return undefined;
  }
  // debugger;
  currentBoardObj.rows().forEach(function(row, rowInd) {
    row.forEach(function (col, colInd) {
      // debugger;
      if (col === 0) {
        // var newBoard = new Board(currentBoardObj.rows());
        // newBoard.togglePiece(rowInd, colInd);
        // newBoard.get(rowInd)[colInd] = 1;
        currentBoardObj.get(rowInd)[colInd] = 1;
        // console.log('Board after toggle: ' + newBoard.rows());
        console.log('Board after toggle: ' + currentBoardObj.rows());
        // console.log('rooks conflict check: ' + currentBoardObj.hasAnyRooksConflicts());
        // if (newBoard.hasAnyRooksConflicts() === false) {
        if (currentBoardObj.hasAnyRooksConflicts() === false) {
          // window.findNRooksSolution(n - 1, newBoard, n, results);
          var tempBoard = new Board(currentBoardObj.rows());
          currentBoardObj.childrenTree.push(tempBoard.rows());
          // currentBoardObj.childrenTree.push(new Board(currentBoardObj.rows()));
          var test = new Board(currentBoardObj.rows());
          console.log('Test board: ' + test.rows());
        }
        currentBoardObj.get(rowInd)[colInd] = 0;
        // newBoard.togglePiece(rowInd, colInd);
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
